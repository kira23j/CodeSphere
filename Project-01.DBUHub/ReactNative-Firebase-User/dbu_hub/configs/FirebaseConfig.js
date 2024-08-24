// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWI9P_Vw2Mu5GqtYl5g6VDZtVM4PbO_kM",
  authDomain: "dbuhub-6a8a7.firebaseapp.com",
  projectId: "dbuhub-6a8a7",
  storageBucket: "dbuhub-6a8a7.appspot.com",
  messagingSenderId: "76609070419",
  appId: "1:76609070419:web:505e76014c99f5523ceda6",
  measurementId: "G-BJJ61YBMJ8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
