// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_URI_API_KEY,
  authDomain: process.env.REACT_APP_URI_AUTH_DOMAIN,
  projectId: "dphi-hackathon-98e69",
  storageBucket: process.env.REACT_APP_URI_STORAGE_BUCKET,
  messagingSenderId: "800407744484",
  appId: process.env.REACT_APP_URI_APP_ID,
  measurementId: "G-CDTYHECZ1H",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
