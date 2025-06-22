// lib/firebase-admin.ts
import admin from 'firebase-admin';

const serviceAccount = require('../../firebase-service-account.json'); // adjust path as needed

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export { db };
