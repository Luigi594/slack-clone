import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB3S2etpfw9wAzIxZvmD-apFumiDhwplck",
    authDomain: "slack-clone-ac6b4.firebaseapp.com",
    projectId: "slack-clone-ac6b4",
    storageBucket: "slack-clone-ac6b4.appspot.com",
    messagingSenderId: "386308125816",
    appId: "1:386308125816:web:173d8138b229331cf9298d"
};

const app = initializeApp(firebaseConfig);
console.log(app);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };