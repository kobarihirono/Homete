// features/Lists/hooks/useFirebase.ts

import { collection, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export const useFirebase = () => {
  const addList = async (listName: string, userId: string) => {
    const timestamp = Timestamp.now();
    return addDoc(collection(db, 'taskLists'), {
      name: listName,
      createdAt: timestamp,
      updatedAt: timestamp,
      userId: userId,
    });
  };

  const updateList = async (taskId: string, taskName: string) => {
    const taskDocRef = doc(db, 'taskLists', taskId);
    const timestamp = Timestamp.now();
    await updateDoc(taskDocRef, {
      name: taskName,
      updatedAt: timestamp,
    });
  };

  return { addList, updateList };
};
