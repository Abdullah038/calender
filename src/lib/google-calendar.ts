// lib/google-calendar.ts
import { JWT } from "google-auth-library";
import { google } from "googleapis";

// Decode your base64-encoded service account JSON from the env var
if (!process.env.GOOGLE_SERVICE_ACCOUNT_BASE64) {
  throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_BASE64 env var");
}

const keyFile = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf8")
);

// Create the JWT client and Google Calendar API instance
const jwtClient = new JWT({
  email: keyFile.client_email,
  key: keyFile.private_key,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

export const calendar = google.calendar({
  version: "v3",
  auth: jwtClient,
});
