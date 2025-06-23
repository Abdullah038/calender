// lib/firebase-admin.ts
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT!, 'base64').toString('utf8')
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export { db };
