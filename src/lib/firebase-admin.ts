// lib/firebase-admin.ts
import admin from 'firebase-admin'

// Parse the base64‐encoded JSON you stored in Vercel’s FIREBASE_SERVICE_ACCOUNT
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT!, 'base64').toString('utf8')
)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const db = admin.firestore()
