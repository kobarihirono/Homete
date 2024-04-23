//  src/app/auth/login/page.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { sendPasswordReset } from '../../../lib/firebase/apis/auth';
import Button from '../../components/elements/button/Button';
import Input from '../../components/elements/input/Input';
import styles from './forget.module.scss';

const Register = () => {
  const [email, setEmail] = useState('');

  const handleRegisterClick = async () => {
    const result = await sendPasswordReset(email);
    if (result.isSuccess) {
      alert('パスワードリセットメールを送信しました。');
      setEmail('');
    } else {
      alert('メール送信に失敗しました: ' + result.message);
    }
  };

  return (
    <div className={styles.forget__wrap}>
      <div className={styles.forget}>
        <div className={styles.forget__icon}>
          <Image
            src='/icons/lock.png'
            alt='logo'
            width={27}
            height={35}
          />
        </div>
        <h1 className={styles.forget__title}>パスワード再設定</h1>
        <p className={styles.forget__text}>
          登録済みメールアドレスを送信すると、
          <br />
          パスワード再設定URLが添付されたメールが届きます。
        </p>
        <div className={styles.forget__input}>
          <label className={styles.forget__inputTitle}>メールアドレス</label>
          <Input
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.forget__button}>
          <Button
            label='送信'
            className='primary'
            onClick={handleRegisterClick}
          />
        </div>
        <Link
          className={styles.forget__link}
          href='/auth/register'
        >
          ログイン画面に戻る
        </Link>
      </div>
    </div>
  );
};

export default Register;
