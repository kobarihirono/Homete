import React from 'react';
import Image from 'next/image';
import styles from '../styles/top.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.top}>
      <div className={styles.top__img_wrap}>
      <Image
        className={styles.top__img}
        src='/images/top.png'
        alt='PC操作を行う男性のイラスト'
        width={400}
        height={400}
      />
      </div>
      <div className={styles.top__text}>
        <p className={styles.top__text_item}>完了したタスクを褒めてくれるTodoアプリです</p>
        <p className={styles.top__text_item}>日々のモチベーションアップに使ってみませんか？</p>
      </div>
    </div>
  );
};

export default Dashboard;
