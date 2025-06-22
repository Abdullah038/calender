// import { google } from "googleapis";
// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_OAUTH_CLIENT_ID!,
//     process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
//     process.env.GOOGLE_OAUTH_REDIRECT_URI!
//   );

//   const code = req.query.code as string;
//   if (!code) return res.status(400).send("Missing code");

//   try {
//     const { tokens } = await oauth2Client.getToken(code);


//     console.log("OAuth Tokens:", tokens);

//     res.status(200).send("Google Calendar connected! You can close this window.");
//   } catch (err) {
//     console.error("OAuth callback error:", err);
//     res.status(500).send("OAuth error");
//   }
// }
