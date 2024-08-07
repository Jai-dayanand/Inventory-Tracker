
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, getfirestore} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-pn5u_m4b62SohCxBCr1u2GeXCQ27Ljc",
  authDomain: "invetory-management-acb0e.firebaseapp.com",
  projectId: "invetory-management-acb0e",
  storageBucket: "invetory-management-acb0e.appspot.com",
  messagingSenderId: "1067856191271",
  appId: "1:1067856191271:web:475b45ad2bffd53bd3d302",
  measurementId: "G-KZ8TBJGE3F" 
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
    })
    .catch((error) => {
      console.error(error);
    });
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log('User signed out');
    })
    .catch((error) => {
      console.error(error);
    });
};

export { auth, firestore, signInWithGoogle, signOutUser, onAuthStateChanged, storage };
