import { auth } from "./firebase.config";

import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password );
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password );
};

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  }
  
  export const doPasswordChange = async (email, oldPassword, newPassword) => {
    try {
      await signInWithEmailAndPassword(auth, email, oldPassword); 
      await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
      throw error;
    }
  }