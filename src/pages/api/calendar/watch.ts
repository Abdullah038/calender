import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

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
  if (req.method !== "POST") return res.status(405).end();

  try {
    const watchResponse = await calendar.events.watch({
      calendarId: "2d74e531ba0ad48e996fd31992596cfef8aaf4787d381bb70b22650c99d9e9cb@group.calendar.google.com", // replace if not "primary"
      requestBody: {
        id: uuidv4(), // unique ID for the channel
        type: "web_hook",
        address: "https://calender-woad.vercel.app/api/calendar/webhook",
 // this is your listener
      },
    });

    res.status(200).json({ message: "Webhook registered", data: watchResponse.data });
  } catch (err) {
    console.error("Watch setup failed:", err);
    res.status(500).json({ error: "Failed to register webhook" });
  }
}
