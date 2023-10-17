import { db } from './main';
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';

import {
  noteDataModel,
  singleNoteDataModel,
  updateDataModel,
} from '../ts/noteDataModel';

export const createNotes = async (noteData: noteDataModel): Promise<void> => {
  try {
    const docRef = await addDoc(collection(db, 'notes'), noteData);

    console.log('Note created successfully with ID: ', docRef.id);
  } catch (error) {
    console.error('Error creating note: ', error);
    throw error;
  }
};

export const updateNotes = async (
  docId: string | undefined,
  updateData: updateDataModel
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'notes', docId || ''), updateData);
  } catch (error) {
    console.log('An error occurred while trying to update data', error);
    throw error;
  }
};

export const getNotes = async (userId: unknown): Promise<noteDataModel[]> => {
  try {
    const notesCollection = collection(db, 'notes');
    const orderedQuery = query(
      notesCollection,
      orderBy('lastEdit', 'desc'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(orderedQuery);

    const allNotes: noteDataModel[] = [];

    querySnapshot.forEach((doc) => {
      // Add each document's data to the array
      const data = doc.data();

      if (data) {
        allNotes.push({
          id: doc.id,
          title: data.title || '',
          content: data.content || '',
          color: data.color || '',
          userId: data.userId || '',
          lastEdit: data.lastEdit || '',
        });
      }
    });

    return allNotes;
  } catch (error) {
    console.error('Error while fetching documents: ', error);
    throw error;
  }
};

export const getSingleNote = async (
  docId: string | undefined
): Promise<singleNoteDataModel | null> => {
  const docRef = doc(db, 'notes', docId || '');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const noteData = docSnap.data() as singleNoteDataModel;
    return noteData; // Return the fetched note data
  } else {
    return null; // Return null when the document doesn't exist
  }
};

export const deleteSingleNote = async (
  docId: string | undefined
): Promise<void> => {
  const docRef = doc(db, 'notes', docId || '');

  try {
    await deleteDoc(docRef);
    console.log('Note deleted successfully');
  } catch (error) {
    console.log('Error while deleting note', error);
  }
};
