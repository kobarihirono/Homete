// src/app/auth/register/page.tsx

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signUpWithEmail } from '../../../lib/firebase/apis/auth';
import Button from '../../components/elements/button/Button';
import Input from '../../components/elements/input/Input';
import styles from './register.module.scss';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('パスワードが一致しません。');
      return;
    }

    const result = await signUpWithEmail({ email, password, username });

    if (result.isSuccess) {
      router.push('/');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className={styles.register__wrap}>
      <div className={styles.register}>
        <h1 className={styles.register__title}>新規登録</h1>
        <div className={styles.register__input}>
          <label className={styles.register__inputTitle}>ユーザー名</label>
          <Input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.register__input}>
          <label className={styles.register__inputTitle}>メールアドレス</label>
          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.register__input}>
          <label className={styles.register__inputTitle}>パスワード</label>
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.register__input}>
          <label className={styles.register__inputTitle}>パスワード再確認</label>
          <Input
            type='password'
            placeholder='Password Confirm'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.register__button}>
          <Button
            label='新規登録'
            className='primary'
            onClick={handleSignUp}
          />
        </div>
        <Link
          className={styles.register__link}
          href='/auth/login'
        >
          登録済みの方はこちら
        </Link>
      </div>
    </div>
  );
};

export default Register;
