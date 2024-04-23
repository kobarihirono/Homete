// src/features/Lists/hooks/useUserTaskLists.ts

'use client';

import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { TaskList } from '@/features/Lists/types/index';
import { db } from '@/lib/firebase/config';

export const useUserTaskLists = (userId: string | null) => {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, 'taskLists'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lists = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt,
        userId: doc.data().userId,
        tasks: doc.data().tasks || [], // DBにタスクは保持しないが、エラーを回避するために空配列を設定
      }));
      setTaskLists(lists);
    });

    return () => unsubscribe();
  }, [userId]);

  return taskLists;
};
