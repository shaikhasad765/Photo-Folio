// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAX-WUB9HU8G9ALyAAfkH-PVgdP_n4RbMM",
    authDomain: "albumapp-f6eed.firebaseapp.com",
    projectId: "albumapp-f6eed",
    storageBucket: "albumapp-f6eed.appspot.com",
    messagingSenderId: "343453639768",
    appId: "1:343453639768:web:68f1fa5f51d8abc524162d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);