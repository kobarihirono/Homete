// addIcon.tsx

import React from 'react';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import styles from './AddIcon.module.scss';

const AddIcon = () => {
  return (
    <div className={styles.addIcon}>
      <MdOutlinePlaylistAdd className={styles.addIcon__icon} />
    </div>
  );
};

export default AddIcon;
