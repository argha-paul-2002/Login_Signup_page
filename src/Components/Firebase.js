import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDUeQGODJYKITtNzteb6QBtWpzTOTOADMs",
    authDomain: "trycom-633e6.firebaseapp.com",
    projectId: "trycom-633e6",
    storageBucket: "trycom-633e6.appspot.com",
    messagingSenderId: "958854556331",
    appId: "1:958854556331:web:81e0f891c9c773c9ad25ee",
    measurementId: "G-TS83FEZ9CB"
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app)
export const provider = new GoogleAuthProvider();
