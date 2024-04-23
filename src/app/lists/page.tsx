// src/app/lists/page.tsx

'use client';

import React, { useState } from 'react';
import AddIcon from '../components/elements/addIcon/AddIcon';
import ListAddModal from '../components/elements/modal/ListAddModal';
import styles from './Lists.module.scss';
import TodoList from '@/features/Lists/components/TodoList/TodoList';
import { useUserTaskLists } from '@/features/Lists/hooks/useUserTaskLists';
import { useAuth } from '@/lib/firebase/hooks/useAuth';

const Lists = () => {
  const { currentUser, loading } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const taskLists = useUserTaskLists(!loading && currentUser ? currentUser.uid : null);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {taskLists.map((list) => (
        <TodoList
          key={list.id}
          listName={list.name}
          tasks={list.tasks || []}
        />
      ))}
      <div
        onClick={handleOpenModal}
        className={styles.iconContainer}
      >
        <AddIcon />
      </div>
      <ListAddModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      />
    </div>
  );
};

export default Lists;
