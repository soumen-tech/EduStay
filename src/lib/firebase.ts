// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQNtWEzVXAhU51vXxZ0Sp-zTC5z5FQ0bk",
  authDomain: "edustay-aot-finder.firebaseapp.com",
  projectId: "edustay-aot-finder",
  storageBucket: "edustay-aot-finder.firebasestorage.app",
  messagingSenderId: "688069450822",
  appId: "1:688069450822:web:c8a15384b08a63c7637e47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
