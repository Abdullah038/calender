// src/pages/api/calendar/webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("📨 Webhook received:", req.headers["x-goog-resource-state"]);
  res.status(200).send("OK");
}
