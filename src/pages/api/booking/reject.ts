// pages/api/booking/reject.ts
import { google } from "googleapis";
import { db } from "@/lib/firebase-admin";
import { sendRejectionEmail } from "@/lib/sendEmail";
import type { NextApiRequest, NextApiResponse } from "next";

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
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { eventId } = req.body;

  if (!eventId) return res.status(400).json({ message: "Missing eventId" });

  try {
    const doc = await db.collection("bookings").doc(eventId).get();
    if (!doc.exists) return res.status(404).json({ message: "Booking not found" });

    const data = doc.data()!;

    // Delete from Google Calendar
    await calendar.events.delete({
      calendarId: "2d74e531ba0ad48e996fd31992596cfef8aaf4787d381bb70b22650c99d9e9cb@group.calendar.google.com", // same as your insert one
      eventId,
    });

    // Delete from Firestore
    await db.collection("bookings").doc(eventId).delete();

    // Send rejection email
    await sendRejectionEmail({
      to_name: `${data.firstName} ${data.lastName}`,
      to_email: data.email,
      service: data.service,
      date: new Date(data.start).toDateString(),
      time: new Date(data.start).toLocaleTimeString(),
    });

    return res.status(200).json({ message: "Booking rejected and email sent" });
  } catch (err) {
    console.error("Reject error:", err);
    return res.status(500).json({ message: "Error rejecting booking" });
  }
}
