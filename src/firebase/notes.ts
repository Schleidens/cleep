import { db } from "./main";
import { collection, addDoc } from "firebase/firestore";


export const createNotes = async ( noteData: unknown): Promise<void> => {
    try {
    const docRef = await addDoc(collection(db, 'notes'), { noteData });

    console.log('Note created successfully with ID: ', docRef.id);
  } catch (error) {
    console.error('Error creating note: ', error);
    throw error;
  }
}