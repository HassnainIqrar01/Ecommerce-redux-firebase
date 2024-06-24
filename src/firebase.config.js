
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDSFem5AdTQ3K5ktn9yagDHEEGXYUTj5Ic",
  authDomain: "ecom-bf40b.firebaseapp.com",
  projectId: "ecom-bf40b",
  storageBucket: "ecom-bf40b.appspot.com",
  messagingSenderId: "649620446763",
  databaseURL: "https://ecom-bf40b-default-rtdb.asia-southeast1.firebasedatabase.app",
  appId: "1:649620446763:web:a7d23853b4a3115436546e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app);


export {app, auth, database};