// src/pages/api/calendar/webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { db } from "@/lib/firebase-admin"; // adjust if path differs
import { sendRejectionEmail } from "@/lib/sendEmail";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const resourceState = req.headers["x-goog-resource-state"] as string;
  const resourceId = req.headers["x-goog-resource-id"] as string;

  console.log("📨 Webhook triggered:", { resourceState, resourceId });

  // We’re only interested in syncs or updates (ignore exists)
  if (resourceState === "exists") {
    return res.status(200).send("Ignoring 'exists' ping");
  }

  try {
    // 1. Optionally use resourceId to find matching eventId from Firestore
    const snapshot = await db
      .collection("bookings")
      .where("resourceId", "==", resourceId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.warn("⚠️ No matching booking found for resourceId:", resourceId);
      return res.status(200).send("No matching booking found");
    }

    const bookingDoc = snapshot.docs[0];
    const booking = bookingDoc.data();
    const calendarId = "2d74e531ba0ad48e996fd31992596cfef8aaf4787d381bb70b22650c99d9e9cb@group.calendar.google.com";

    // 2. Fetch current event from Google Calendar
    const event = await calendar.events.get({
      calendarId,
      eventId: booking.eventId,
    });

    // 3. If it’s still tentative → do nothing
    if (event.data.status === "tentative") {
      console.log("🕒 Event is still tentative, awaiting organizer decision");
      return res.status(200).send("Tentative — waiting");
    }

    // 4. If it’s confirmed and client not added → PATCH to add them
    const attendees = event.data.attendees || [];
    const clientAlreadyAdded = attendees.some((a) => a.email === booking.email);

    if (event.data.status === "confirmed" && !clientAlreadyAdded) {
      const newSummary = (event.data.summary || "").replace(
        "[PENDING]",
        "[CONFIRMED]"
      );
      await calendar.events.patch({
        calendarId,
        eventId: booking.eventId,
        sendUpdates: "all",
        requestBody: {
          attendees: [...attendees, { email: booking.email }],
          summary: newSummary,
        },
      });

      console.log("✅ Client added to confirmed event:", booking.email);

      // Optional: update Firestore status
      await bookingDoc.ref.update({ status: "confirmed" });
    }

    // 5. If the event was deleted or cancelled
    if (event.data.status === "cancelled") {
      console.log("❌ Event was cancelled — client will be notified by Google");

      // Optional: clean up or update Firestore
      await bookingDoc.ref.update({ status: "cancelled" });

      // Send rejection email to client
      try {
        await sendRejectionEmail({
          to_name: booking.fullName || booking.firstName,
          to_email: booking.email,
          service: booking.service,
          date: booking.start,
          time: booking.start,
        });
      } catch (emailErr) {
        console.error("Failed to send rejection email", emailErr);
      }
    }

    return res.status(200).send("Webhook processed");
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return res.status(500).send("Webhook error");
  }
}
