import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Only initialize if we're in Node.js environment
if (typeof window === 'undefined') {
  const firebaseAdminConfig = {
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  };

  if (!getApps().length) {
    initializeApp(firebaseAdminConfig);
  }
}

export function getFirebaseAdmin() {
  if (typeof window !== 'undefined') {
    throw new Error('Firebase Admin can only be used in server-side code');
  }
  return getAuth();
} 