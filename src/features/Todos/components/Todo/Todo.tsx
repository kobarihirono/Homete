// Todo component

import React from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import styles from './Todo.module.scss';

const Todo = ({ taskName }) => {
  return (
    <div className={styles.todo__wrap}>
      <div className={styles.todo}>
        <input
          type='checkbox'
          className={styles.todo__checkbox}
        />
        <span className={styles.todo__name}>{taskName}</span>
        <div className={styles.icons}>
          <FiEdit2 className={styles.icons__edit} />
          <FiTrash2 className={styles.icons__delete} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
