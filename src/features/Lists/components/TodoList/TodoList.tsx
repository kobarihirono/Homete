// TodoList.tsx

'use client';

import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import styles from './TodoList.module.scss';
import { useFirebase } from '@/features/Lists/hooks/useFirebase';
import { useUserTaskLists } from '@/features/Lists/hooks/useUserTaskLists';
import { useAuth } from '@/lib/firebase/hooks/useAuth';

interface TodoListProps {
  listName: string;
  tasks: string[];
}

const TodoList: React.FC<TodoListProps> = ({ listName, tasks }) => {
  const { currentUser } = useAuth();
  const lists = useUserTaskLists(currentUser?.uid || null);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedListName, setEditedListName] = useState('');
  const { updateList, deleteList } = useFirebase();
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editIndex !== null) {
      editInputRef.current?.focus();
    }
  }, [editIndex]);

  const handleEditClick = (index: number, listName: string) => {
    setEditedListName(listName);
    setEditIndex(index);
  };

  const handleListUpdate = async (listId: string) => {
    if (editedListName) {
      await updateList(listId, editedListName);
      setEditIndex(null);
      setEditedListName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleListUpdate(lists[editIndex!].id);
    }
  };

  const handleDeleteClick = async (listId: string) => {
    await deleteList(listId);
  };

  return (
    <div className={styles.todoList__wrap}>
      {lists?.map((list, index) => (
        <div
          key={list.id}
          className={styles.todoList}
        >
          <div className={styles.todoList__Item}>
            {editIndex === index ? (
              <input
                className={styles.todoList__editInput}
                ref={editInputRef}
                value={editedListName}
                onChange={(e) => setEditedListName(e.target.value)}
                onBlur={() => handleListUpdate(list.id)}
                onKeyPress={handleKeyPress}
              />
            ) : (
              <Link href={`/todos/${list.id}`}>
                <span className={styles.listName}>{list.name}</span>
              </Link>
            )}
            <div className={styles.icons}>
              <FiEdit2
                className={styles.icons__edit}
                onClick={() => handleEditClick(index, list.name)}
              />
              <FiTrash2
                className={styles.icons__delete}
                onClick={() => handleDeleteClick(list.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
