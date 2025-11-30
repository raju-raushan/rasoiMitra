'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string, displayName: string): void {
  createUserWithEmailAndPassword(authInstance, email, password)
    .then((userCredential) => {
      // Once the user is created, update their profile with the display name.
      // This is a non-blocking "fire-and-forget" operation.
      if (userCredential.user) {
        updateProfile(userCredential.user, { displayName });
      }
    })
    .catch((error) => {
      // The onAuthStateChanged listener will handle the overall auth state,
      // but you might want to log creation-specific errors here.
      console.error("Error during sign-up:", error);
    });
}


/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password);
}
