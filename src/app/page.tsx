import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Linkをインポート
import styles from '../styles/top.module.scss';
import Button from './components/elements/button/Button';

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
      <div className={styles.top__button}>
        <Link href="/auth/login" passHref>
          <Button
            label='ログイン'
            type='button'
            className='secondary'
          />
        </Link>
        <Link href="/auth/register" passHref>
          <Button
            label='新規登録'
            type='button'
            className='primary'
          />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
