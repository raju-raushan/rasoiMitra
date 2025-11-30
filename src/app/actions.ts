'use server';

import {
  detectIngredientsFromImage,
  suggestRecipesFromIngredients,
} from '@/ai/flows';
import { getAuth } from 'firebase/auth/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { getApp } from 'firebase/app';


export async function processFridgeImage(photoDataUri: string) {
  const result = await detectIngredientsFromImage({
    photoDataUri,
  });
  return result;
}

export async function generateRecipes(ingredients: string[]) {
  const result = await suggestRecipesFromIngredients({ ingredients });
  return result;
}

export async function saveHistory(data: { action: string, details: string }) {
    try {
        const { auth, firestore } = initializeFirebase();
        const user = auth.currentUser;

        if (!user) {
            console.log("No authenticated user found. Skipping history save.");
            return;
        }

        const historyRef = collection(firestore, `users/${user.uid}/history`);
        await addDoc(historyRef, {
            ...data,
            userId: user.uid,
            timestamp: serverTimestamp(),
        });

    } catch (error) {
        console.error("Error saving history:", error);
        // We don't want to throw here and break the user flow
        // for a non-critical operation
    }
}
