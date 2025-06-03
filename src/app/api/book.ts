import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, date, startTime, endTime, notes } = req.body;

  // Authenticate with a service account
  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/calendar']
  );
  const calendar = google.calendar({ version: 'v3', auth });

  // Build the event
  const start = new Date(startTime);
  const end = new Date(endTime);
  const event = {
    summary: `Booking: ${name}`,
    description: `Email: ${email}\nNotes: ${notes || 'None'}`,
    start: { dateTime: start.toISOString() },
    end: { dateTime: end.toISOString() },
  };

  try {
    await calendar.events.insert({
      calendarId: 'a70604b030a3f36fd3ab63d27f34dceb9d6164765d68d856d4e7418c75b2aec3@group.calendar.google.com',
      requestBody: event,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Calendar error:', error);
    res.status(500).json({ error: 'Unable to create event' });
  }
}
