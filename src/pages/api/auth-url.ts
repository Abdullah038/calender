// import { google } from "googleapis";
// import type { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_OAUTH_CLIENT_ID!,
//     process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
//     process.env.GOOGLE_OAUTH_REDIRECT_URI!
//   );

//   const authUrl = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: ["https://www.googleapis.com/auth/calendar"],
//     prompt: "consent",
//   });

//   res.redirect(authUrl);
// }
