// features/Todo/hooks/useFirebase.ts

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  getDocs,
  query,
} from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '@/lib/firebase/config';

export const useFirebase = () => {
  // タスクを追加
  const addTask = async (listId: string, taskName: string) => {
    const timestamp = Timestamp.now();
    const taskDocRef = await addDoc(collection(db, 'taskLists', listId, 'tasks'), {
      name: taskName,
      completed: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    return taskDocRef;
  };

  // タスクを更新
  const updateTask = async (taskId: string, listId: string, updates: Object) => {
    const taskDocRef = doc(db, 'taskLists', listId, 'tasks', taskId);
    const timestamp = Timestamp.now();
    await updateDoc(taskDocRef, {
      ...updates,
      updatedAt: timestamp,
    });
  };

  // タスクを削除
  const deleteTask = async (taskId: string, listId: string) => {
    const taskDocRef = doc(db, 'taskLists', listId, 'tasks', taskId);
    await deleteDoc(taskDocRef);
  };

  const fetchTasks = async (listId: string) => {
    try {
      const tasksQuery = query(collection(db, 'taskLists', listId, 'tasks'));
      const querySnapshot = await getDocs(tasksQuery);
      const tasks = querySnapshot.docs.map((doc) => {
        const taskData = doc.data();
        return {
          id: doc.id,
          name: taskData.name || '',
          completed: taskData.completed || false,
        };
      });
      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error(`Failed to fetch tasks for list ${listId}: ${error}`);
    }
  };

  const toggleTaskCompleted = async (taskId: string, listId: string, completed: boolean) => {
    const taskDocRef = doc(db, 'taskLists', listId, 'tasks', taskId);
    const timestamp = Timestamp.now();
    await updateDoc(taskDocRef, {
      completed: completed,
      updatedAt: timestamp,
    });
  };

  return {
    addTask,
    updateTask,
    deleteTask,
    fetchTasks,
    toggleTaskCompleted,
  };
};
