import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkyCN6sV5qi0__JdKuxpNXg_2wrCVeEC4",
  authDomain: "minihackathon-3e674.firebaseapp.com",
  projectId: "minihackathon-3e674",
  storageBucket: "minihackathon-3e674.appspot.com",
  messagingSenderId: "1014026137555",
  appId: "1:1014026137555:web:a10d19357a67f827714926"
};

// Initialize Firebase 
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const rdb = getDatabase(app);