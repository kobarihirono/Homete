// src/app/components/elements/modal/ListAddModal.tsx

import React, { useState, FC } from 'react';
import Button from '../button/Button';
import styles from './Modal.module.scss';
import { useFirebase } from '@/features/Lists/hooks/useFirebase';
import { useAuth } from '@/lib/firebase/hooks/useAuth';

interface ListAddModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  userId: string;
}

const ListAddModal: FC<ListAddModalProps> = ({ isOpen, onRequestClose }) => {
  const [listName, setListName] = useState('');
  const { addList } = useFirebase();
  const { currentUser } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentUser) {
      await addList(listName, currentUser.uid);
    } else {
      console.error('ユーザーが見つかりません');
    }

    onRequestClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.modal__title}>リストの作成</h2>
        <form
          className={styles.modal__form}
          onSubmit={handleSubmit}
        >
          <label htmlFor='listName'>リスト名</label>
          <input
            className={styles.modal__formInput}
            type='text'
            id='listName'
            value={listName}
            onChange={(e) => setListName(e.target.value)}
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

export default ListAddModal;
