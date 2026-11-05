import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyDkdYJIAcmAPyhxIs2DoJJH9e7q0WTfalI",
  authDomain: "nexus-ls.firebaseapp.com",
  projectId: "nexus-ls",
  storageBucket: "nexus-ls.firebasestorage.app",
  messagingSenderId: "376370391648",
  appId: "1:376370391648:web:e4dfc7cdcff70e38f73105",
  measurementId: "G-VH1PQWR7HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Analytics if supported in this environment
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics not supported or blocked
  });
}

export default app;
