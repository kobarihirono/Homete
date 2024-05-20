// src/app/components/elements/modal/TaskAddModal.tsx

import React, { useState } from 'react';
import Button from '../button/Button';
import styles from './Modal.module.scss';
import { useFirebase } from '@/features/Todos/hooks/useFirebase';

interface TaskAddModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  listId: string;
}

const TaskAddModal: React.FC<TaskAddModalProps> = ({ isOpen, onRequestClose, listId }) => {
  const [taskName, setTaskName] = useState('');
  const { addTask } = useFirebase();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskName) {
      await addTask(listId, taskName);
      setTaskName('');
      onRequestClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.modal__title}>タスクの作成</h2>
        <form
          className={styles.modal__form}
          onSubmit={handleSubmit}
        >
          <label htmlFor='listName'>タスク名</label>
          <input
            className={styles.modal__formInput}
            type='text'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder='タスク名を入力'
          />
          <div className={styles.modal__buttons}>
            <Button
              label='登録'
              type='submit'
              className='primary'
            />
            <Button
              label='戻る'
              type='button'
              onClick={onRequestClose}
              className='back'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskAddModal;
