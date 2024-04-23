// src/app/todos/pages.tsx

import React from 'react';
import Todo from '../../features/Todos/components/Todo/Todo';
import AddIcon from '../components/elements/addIcon/AddIcon';
import styles from './Todos.module.scss';
import ChangeHeader from '@/features/Todos/components/ChangeHeader/ChangeHeader';

const Todos = () => {
  return (
    <div>
      <ChangeHeader />
      <Todo taskName='タスク1' />
      <Todo taskName='タスク2' />
      <Todo taskName='タスク3' />
      <div className={styles.iconContainer}>
        <AddIcon />
      </div>
    </div>
  );
};

export default Todos;
