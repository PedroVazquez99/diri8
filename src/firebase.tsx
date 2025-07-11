import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAW9gUEGqWNJDV8J_SOg_MHs5FAmytHgCM",
    authDomain: "diri8-216d4.firebaseapp.com",
    projectId: "diri8-216d4",
    storageBucket: "diri8-216d4.firebasestorage.app",
    messagingSenderId: "1029873586868",
    appId: "1:1029873586868:web:6d73a38e60f97b1681fde1",
    measurementId: "G-KM0L0ND6Q9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);