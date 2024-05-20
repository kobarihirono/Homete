// features/Lists/hooks/useFirebase.ts

import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export const useFirebase = () => {
  // リストを追加
  const addList = async (listName: string, userId: string) => {
    const timestamp = Timestamp.now();
    const listDocRef = await addDoc(collection(db, 'taskLists'), {
      name: listName,
      createdAt: timestamp,
      updatedAt: timestamp,
      userId: userId,
    });
    return listDocRef;
  };

  // リストを更新
  const updateList = async (listId: string, listName: string) => {
    const listDocRef = doc(db, 'taskLists', listId);
    const timestamp = Timestamp.now();
    await updateDoc(listDocRef, {
      name: listName,
      updatedAt: timestamp,
    });
  };

  // リストを削除
  const deleteList = async (listId: string) => {
    const listDocRef = doc(db, 'taskLists', listId);
    await deleteDoc(listDocRef);
  };

  // リスト内に新しいタスクを追加
  const addTaskToList = async (listId: string, taskName: string) => {
    const timestamp = Timestamp.now();
    const tasksCollectionRef = collection(db, 'taskLists', listId, 'tasks');
    await addDoc(tasksCollectionRef, {
      name: taskName,
      completed: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  };

  return { addList, updateList, deleteList, addTaskToList };
};
