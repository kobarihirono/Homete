// src/app/lists/page.tsx

'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import AddIcon from '../components/elements/addIcon/AddIcon';
import ListAddModal from '../components/elements/modal/ListAddModal';
import styles from './Lists.module.scss';
import TodoList, { Task } from '@/features/Lists/components/TodoList/TodoList';
import { useUserTaskLists } from '@/features/Lists/hooks/useUserTaskLists';
import { useAuth } from '@/lib/firebase/hooks/useAuth';
import { Puff } from 'react-loader-spinner';

const Lists = () => {
  const { currentUser, loading } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const taskLists = useUserTaskLists(!loading && currentUser ? currentUser.uid : null);

  const convertToTaskArray = (tasks: string[]): Task[] => {
    return tasks.map((task, index) => ({
      id: index.toString(),
      title: task,
      completed: false,
    }));
  };

  if (loading) {
    return (
      <div>
        <Puff
          color='$main-bg'
          height={100}
          width={100}
          visible={true}
        />
      </div>
    );
  }

  const listContent =
    taskLists.length > 0 ? (
      <TodoList
        key={taskLists[0].id}
        listName={taskLists[0].name}
        tasks={convertToTaskArray(taskLists[0].tasks || [])}
      />
    ) : (
      <div className={styles.noList}>
        <p className={styles.noList__text}>現在、リストはありません</p>
        <Image
          className={styles.noList__img}
          src='/images/no-list.png'
          alt='bookshelf'
          width={300}
          height={300}
        />
      </div>
    );

  return (
    <div>
      {listContent}
      <div
        onClick={handleOpenModal}
        className={styles.iconContainer}
      >
        <AddIcon />
      </div>
      <ListAddModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        userId={currentUser?.uid || ''}
      />
    </div>
  );
};

export default Lists;
