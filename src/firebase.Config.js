// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmq4XYuZU6gaAdni6FmMX8zlkKic3NQcg",
    authDomain: "freefoliostudio.firebaseapp.com",
    projectId: "freefoliostudio",
    storageBucket: "freefoliostudio.appspot.com",
    messagingSenderId: "773613942466",
    appId: "1:773613942466:web:14c26b07637dc06666ed5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;