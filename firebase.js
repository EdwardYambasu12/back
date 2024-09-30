// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcySdlyVHWd27ZlJ5NKEzCDpXLiGiaY5w",
  authDomain: "sportsup-2dc77.firebaseapp.com",
  projectId: "sportsup-2dc77",
  storageBucket: "sportsup-2dc77.appspot.com",
  messagingSenderId: "759581158877",
  appId: "1:759581158877:web:fad697bb4863b7733cda34",
  measurementId: "G-Q1N5ZVRKP6"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const generateToken = async()=>{
  const permission = await Notification.requestPermission();
  console.log(permission)
}