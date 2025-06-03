// src/pages/api/calendar/webhook.ts
import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID!,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
  process.env.GOOGLE_OAUTH_REDIRECT_URI!
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN!,
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const resourceState = req.headers["x-goog-resource-state"];
  const channelId = req.headers["x-goog-channel-id"];
  const resourceId = req.headers["x-goog-resource-id"];
  const messageNumber = req.headers["x-goog-message-number"];

  console.log("📨 Webhook hit:");
  console.log("→ State:", resourceState);
  console.log("→ Resource ID:", resourceId);
  console.log("→ Channel ID:", channelId);
  console.log("→ Message #: ", messageNumber);

  // Only handle actual event updates (not "sync" or "exists" pings)
  if (resourceState === "exists") {
    try {
      const timeMin = new Date(Date.now() - 5 * 60000).toISOString(); // past 5 minutes

      const updated = await calendar.events.list({
        calendarId: "2d74e531ba0ad48e996fd31992596cfef8aaf4787d381bb70b22650c99d9e9cb@group.calendar.google.com",
        updatedMin: timeMin,
        singleEvents: true,
        orderBy: "updated",
        maxResults: 10,
      });

      for (const event of updated.data.items || []) {
        const summary = event.summary;
        const attendees = event.attendees || [];
        const guest = attendees[0];
        const status = guest?.responseStatus;

        console.log(`📅 ${summary}: guest responded with "${status}"`);

        // You could now:
        // - Send an email
        // - Update Firestore
        // - Modify calendar title (e.g. replace [PENDING] with [CONFIRMED])

        // Example: update event title if accepted
        if (status === "accepted" && summary?.includes("[PENDING]")) {
          const newSummary = summary.replace("[PENDING]", "[CONFIRMED]");
          await calendar.events.patch({
            calendarId: event.organizer?.email || "primary",
            eventId: event.id!,
            requestBody: { summary: newSummary },
            sendUpdates: "all", // notifies the client
          });
        }

        if (status === "declined" && summary?.includes("[PENDING]")) {
          const newSummary = summary.replace("[PENDING]", "[DECLINED]");
          await calendar.events.patch({
            calendarId: event.organizer?.email || "primary",
            eventId: event.id!,
            requestBody: { summary: newSummary },
            sendUpdates: "all",
          });
        }
      }
    } catch (err) {
      console.error("❌ Error while handling webhook:", err);
    }
  }

  res.status(200).end();
}
