import { getApps, initializeApp } from '@react-native-firebase/app';

// Initialize Firebase if not already initialized
if (getApps().length === 0) {
  // Values from GoogleService-Info.plist
  const projectId = process.env.FIREBASE_PROJECT_ID || 'liftup-989c0';
  const apiKey = process.env.FIREBASE_API_KEY || 'AIzaSyC81P_ZBqHhlBTY-wQK-vOlovCDSYVReMM';
  const appId = process.env.FIREBASE_APP_ID || '1:981595384339:ios:7dae3b45a7f3f0c20e6de6';
  const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID || '981595384339';
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || 'liftup-989c0.firebasestorage.app';

  // databaseURL is required by React Native Firebase even if not using Realtime Database
  const databaseURL =
    process.env.FIREBASE_DATABASE_URL ||
    'https://liftup-989c0-default-rtdb.europe-west1.firebasedatabase.app';

  initializeApp({
    appId,
    projectId,
    apiKey,
    messagingSenderId,
    storageBucket,
    databaseURL,
  });
}

// Export modular API functions
export { getApp } from '@react-native-firebase/app';
export { getAuth } from '@react-native-firebase/auth';
