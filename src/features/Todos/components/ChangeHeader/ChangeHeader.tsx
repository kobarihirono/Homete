// Todos/components/ChangeHeader/ChangeHeader.tsx

import React from 'react';
import styles from './ChangeHeader.module.scss';

const ChangeHeader = () => {
  return (
    <div className={styles.changeHeader}>
      <div
        className={styles.changeHeader__tab}
        style={{ flex: 1 }}
      >
        <p className={styles.changeHeader__tabTitle}>進行中（1）</p>
      </div>
      <div
        className={styles.changeHeader__tab}
        style={{ flex: 1 }}
      >
        <p className={styles.changeHeader__tabTitle}>完了（1）</p>
      </div>
    </div>
  );
};

export default ChangeHeader;
