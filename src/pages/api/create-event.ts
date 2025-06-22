import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "google-auth-library";
import fs from "fs";
import path from "path";
import { db } from "../../lib/firebase-admin";
import hubspotClient from "../../lib/hubspot";
import { FilterOperatorEnum } from "@hubspot/api-client/lib/codegen/crm/contacts";

// ────────────────────────────────────────────────────────────────────────────────
// 1) Load your Google Service Account JSON from the project root
// ────────────────────────────────────────────────────────────────────────────────
// const keyPath = path.join(process.cwd(), "google-service-account.json");
// const keyFile = JSON.parse(fs.readFileSync(keyPath, "utf8"));

const keyFile = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT!, "base64").toString("utf-8")
);


// Initialize a JWT client so we can call Google Calendar API
const jwtClient = new google.auth.JWT({
  email: keyFile.client_email,
  key: keyFile.private_key,
  scopes: ["https://www.googleapis.com/auth/calendar"],

});
const calendar = google.calendar({ version: "v3", auth: jwtClient });

/**
 * Mapping from service name → colorId for Google Calendar.
 * Feel free to adjust these numeric strings (1–11) to match your preferred palette.
 */
const SERVICE_COLOR: Record<string, string> = {
  "Dog Walking": "2", // green
  "House Sitting": "5", // yellow
  "Drop-In Visits": "6", // purple
  Boarding: "7", // red
  Daycare: "10", // orange
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // 2) Destructure everything the frontend sent, including:
  //    • firstName/lastName or fullName
  //    • email, phone
  //    • startDate (YYYY-MM-DD), startTime (HH:mm)
  //    • endDate (YYYY-MM-DD, optional), endTime (HH:mm)
  //    • service (string)
  //    • durationOption (string, e.g. "30" or "60")
  //    • recurrenceDays (comma‐sep list of 0..6?) or recurrenceCount (string)
  //    • message (optional)
  //    • additionalStartTime (comma‐sep "HH:mm,HH:mm…")
  //    • additionalDurationOption (comma‐sep, e.g. "30,45,…")
  // ──────────────────────────────────────────────────────────────────────────────
  const {
    firstName,
    lastName,
    fullName,
    email,
    phone,
    startDate,
    startTime,
    endDate, // optional
    endTime,
    service,
    durationOption,
    recurrenceDays,
    recurrenceCount,
    message,
    additionalStartTime,
    additionalDurationOption,
  } = req.body as {
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email: string;
    phone?: string;
    startDate: string; // "YYYY-MM-DD"
    startTime: string; // "HH:mm"
    endDate?: string; // "YYYY-MM-DD"
    endTime: string; // "HH:mm"
    service: string;
    durationOption?: string;
    recurrenceDays?: string; // e.g. "1,3,5"
    recurrenceCount?: string; // e.g. "3"
    message?: string;
    additionalStartTime?: string; // e.g. "10:00,14:00"
    additionalDurationOption?: string; // e.g. "30,45"
  };

  const readableDuration = durationOption || "N/A";
  // ──────────────────────────────────────────────────────────────────────────────
  // 3) Determine which name fields to store in HubSpot:
  // ──────────────────────────────────────────────────────────────────────────────
  const contactFirstName = fullName ? fullName : firstName || "";
  const contactLastName = fullName ? "" : lastName || "";

  // ──────────────────────────────────────────────────────────────────────────────
  // 4) Build JS Date objects for the *first* occurrence:
  // ──────────────────────────────────────────────────────────────────────────────
  const [startHour, startMinute] = startTime
    .split(":")
    .map((x) => parseInt(x, 10));
  const [endHour, endMinute] = endTime.split(":").map((x) => parseInt(x, 10));

  const [startYear, startMonth, startDay] = startDate
    .split("-")
    .map((x) => parseInt(x, 10));
  const initialStart = new Date(
    startYear,
    startMonth - 1,
    startDay,
    startHour,
    startMinute
  );

  const [endYear, endMonth, endDay] = (endDate ?? startDate)
    .split("-")
    .map((x) => parseInt(x, 10));
  const initialEnd = new Date(
    endYear,
    endMonth - 1,
    endDay,
    endHour,
    endMinute
  );

  // Guard: end must be strictly after start
  if (initialEnd.getTime() <= initialStart.getTime()) {
    return res
      .status(400)
      .json({
        message: "Invalid time range: endTime must be after startTime.",
      });
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // 5) Parse “recurrenceDays” or fallback to “recurrenceCount”
  //    If recurrenceDays is set, it’s a comma-separated string “0..6”.
  // ──────────────────────────────────────────────────────────────────────────────
  let daysOfWeek: number[] = [];
  if (typeof recurrenceDays === "string" && recurrenceDays.trim() !== "") {
    daysOfWeek = recurrenceDays
      .split(",")
      .map((d) => parseInt(d, 10))
      .filter((n) => !isNaN(n) && n >= 0 && n <= 6);
  }
  // If no recurrenceDays, repeat every single day for nDays
  const nDays = Math.max(1, parseInt(String(recurrenceCount || "1"), 10) || 1);

  // ──────────────────────────────────────────────────────────────────────────────
  // 6) Handle additional time slots:
  //    additionalStartTime and additionalDurationOption come in as comma‐sep strings.
  // ──────────────────────────────────────────────────────────────────────────────
  const extraStarts: string[] = additionalStartTime
    ? (additionalStartTime as string).split(",").map((s) => s.trim())
    : [];
  const extraDurations: string[] = additionalDurationOption
    ? (additionalDurationOption as string).split(",").map((s) => s.trim())
    : [];
  // We assume extraStarts.length === extraDurations.length, both ≤ 3

  try {
    // ────────────────────────────────────────────────────────────────────────────
    // A) Look up (or create) the HubSpot Contact once
    // ────────────────────────────────────────────────────────────────────────────
    let contactId: string | undefined = undefined;
    try {
      const searchResponse =
        await hubspotClient.crm.contacts.searchApi.doSearch({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: "email",
                  operator: FilterOperatorEnum.Eq,
                  value: email,
                },
              ],
            },
          ],
          properties: ["firstname", "lastname", "email", "phone"],
        });
      if (searchResponse.results.length > 0) {
        contactId = searchResponse.results[0].id;
      }
    } catch (searchErr) {
      console.error("HubSpot contact search error:", searchErr);
    }
    if (!contactId) {
      const contactResp = await hubspotClient.crm.contacts.basicApi.create({
        properties: {
          email,
          firstname: contactFirstName,
          lastname: contactLastName,
          phone: phone || "",
        },
      });
      contactId = contactResp.id;
    }

    // ────────────────────────────────────────────────────────────────────────────
    // B) Build an array of “(dayStart, dayEnd)” for each event to create
    //    1) The “main” series blocks
    //    2) Additional one‐off blocks on the same startDate day
    // ────────────────────────────────────────────────────────────────────────────
    type EventSpan = { dayStart: Date; dayEnd: Date; label: string };
    const allEventSpans: EventSpan[] = [];




    // 1) Main series logic
    if (daysOfWeek.length > 0) {
      const durationMs = initialEnd.getTime() - initialStart.getTime();
      const baseWeekday = initialStart.getDay(); // 0..6

      for (const dow of daysOfWeek) {
        // compute difference in days from ‘today’s weekday’ to ‘dow’
        let offset = (dow - baseWeekday + 7) % 7;

        // If offset === 0, we want “today’s” event to appear immediately
        // (so we do NOT force it into next week).
        // In other words, if offset === 0, we’ll schedule exactly initialStart.
        // Otherwise, schedule first occurrence that falls on the requested weekday.

        const eventStart = new Date(initialStart);
        eventStart.setDate(initialStart.getDate() + offset);
        const eventEnd = new Date(eventStart.getTime() + durationMs);

        allEventSpans.push({
          dayStart: eventStart,
          dayEnd: eventEnd,
          label: readableDuration,
        });
      }
    } else {
      // No checkboxes → repeat every day for nDays
      for (let i = 0; i < nDays; i++) {
        const dayStart = new Date(initialStart);
        dayStart.setDate(dayStart.getDate() + i);
        const dayEnd = new Date(initialEnd);
        dayEnd.setDate(dayEnd.getDate() + i);
        if (dayEnd.getTime() > dayStart.getTime()) {
          allEventSpans.push({
            dayStart,
            dayEnd,
            label: readableDuration, 
          });
        }
      }
    }

    // 2) Additional‐time blocks on the same startDate
    if (
      extraStarts.length > 0 &&
      extraDurations.length === extraStarts.length
    ) {
      // We always have a startDate string (YYYY-MM-DD)
      const [y, m, d] = startDate.split("-").map((x) => parseInt(x, 10));
      for (let idx = 0; idx < extraStarts.length; idx++) {
        const [eh, emin] = extraStarts[idx]
          .split(":")
          .map((x) => parseInt(x, 10));
        const minutesToAdd = parseInt(extraDurations[idx], 10); // e.g. “30” means add 30 minutes
        const eventStart = new Date(y, m - 1, d, eh, emin);
        const eventEnd = new Date(eventStart.getTime() + minutesToAdd * 60000);
        if (eventEnd.getTime() > eventStart.getTime()) {
          allEventSpans.push({
            dayStart: eventStart,
            dayEnd: eventEnd,
            label: `Additional #${idx + 1}`,
          });
        }
      }
    }

    // ────────────────────────────────────────────────────────────────────────────
    // C) For each (dayStart, dayEnd) in allEventSpans:
    //    1) Create a Google Calendar event (with service‐specific colorId)
    //    2) Write to Firestore (“bookings” collection)
    //    3) Create a HubSpot Deal
    //    Collect into `createdEvents` for the response
    // ────────────────────────────────────────────────────────────────────────────
    type CreatedEvent = {
      occurrenceIndex: number;
      totalOccurrences: number;
      service: string;
      start: string; // ISO
      end: string; // ISO
    };
    const createdEvents: CreatedEvent[] = [];


    for (let i = 0; i < allEventSpans.length; i++) {
      const { dayStart, dayEnd, label } = allEventSpans[i];

      // Build description
      const descriptionLines = [
        `${label} for ${contactFirstName} ${contactLastName} (${email})`,
        `Service: ${service}`,
      ];
      if (phone) descriptionLines.push(`Phone: ${phone}`);
      if (message) descriptionLines.push(`Message: ${message}`);
      const descriptionText = descriptionLines.join("\n");

      // 1) Create Google Calendar event — now with colorId from SERVICE_COLOR
      const colorId = SERVICE_COLOR[service] || "1";
      
      const summary = `${service} – ${readableDuration} – ${contactFirstName} ${contactLastName}`;

      const googleEvent = await calendar.events.insert({
        calendarId:
          "5a2befffb6957b0aebedfb8653895c19af4d28d3ba5179a02fb6846ced20b3eb@group.calendar.google.com",
        requestBody: {
          summary,
          description: descriptionText,
          start: { dateTime: dayStart.toISOString(), timeZone: "UTC" },
          end: { dateTime: dayEnd.toISOString(), timeZone: "UTC" },
          colorId,
        },
      });
      const eventId = googleEvent.data.id;
      if (!eventId) {
        throw new Error(
          `Failed to retrieve Google Calendar event ID for occurrence ${i + 1}.`
        );
      }

      // 2) Save to Firestore under “bookings/<eventId>”
      await db
        .collection("bookings")
        .doc(eventId)
        .set({
          eventId,
          email,
          phone: phone || null,
          firstName: contactFirstName,
          lastName: contactLastName,
          fullName: fullName || null,
          service,
          occurrenceIndex: i + 1,
          totalOccurrences: allEventSpans.length,
          durationOption: durationOption || null,
          start: dayStart.toISOString(),
          end: dayEnd.toISOString(),
          message: message || "",
          label,
          status: "scheduled",
          createdAt: new Date().toISOString(),
          hubspotContactId: contactId,
        });

      // 3) Create HubSpot Deal for this occurrence
      const DEAL_STAGE_ID = "1474904005"; // ← your actual Deal‐stage ID
      const dealResponse = await hubspotClient.crm.deals.basicApi.create({
        properties: {
          dealname: summary,
          pipeline: "default",
          dealstage: DEAL_STAGE_ID,
          closedate: dayEnd.toISOString(),
          service,
          booking_start: dayStart.toISOString(),
          booking_end: dayEnd.toISOString(),
          occurrence_index: String(i + 1),
          total_occurrences: String(allEventSpans.length),
        },
      });
      const dealId = dealResponse.id!;
      await hubspotClient.crm.associations.batchApi.create(
        "deals",
        "contacts",
        {
          inputs: [
            {
              _from: { id: dealId },
              to: { id: contactId! },
              type: "deal_to_contact",
            },
          ],
        }
      );

      // 4) Add to our `createdEvents` array
      createdEvents.push({
        occurrenceIndex: i + 1,
        totalOccurrences: allEventSpans.length,
        service,
        start: dayStart.toISOString(),
        end: dayEnd.toISOString(),
      });
    }

    // ────────────────────────────────────────────────────────────────────────────
    // D) Return success PLUS the array of created events
    // ────────────────────────────────────────────────────────────────────────────
    return res.status(200).json({
      message: `Created ${createdEvents.length} event(s).`,
      events: createdEvents,
    });
  } catch (err) {
    console.error("Error in booking handler:", err);
    return res
      .status(500)
      .json({ message: "Failed to create booking series." });
  }
}
