//  src/app/auth/login/page.tsx

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signInWithEmail } from '../../../lib/firebase/apis/auth';
import Button from '../../components/elements/button/Button';
import Input from '../../components/elements/input/Input';
import styles from './login.module.scss';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const result = await signInWithEmail({ email, password });

    if (result.isSuccess) {
      router.push('/lists');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className={styles.login__wrap}>
      <div className={styles.login}>
        <h1 className={styles.login__title}>ログイン</h1>
        <div className={styles.login__input}>
          <label className={styles.login__inputTitle}>メールアドレス</label>
          <Input
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.login__input}>
          <label className={styles.login__inputTitle}>パスワード</label>
          <Input
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className={styles.login__button}>
          <Button
            label='ログイン'
            className='primary'
            onClick={handleLogin}
          />
        </div>
        <Link
          className={styles.login__link}
          href='/auth/register'
        >
          新規登録はこちら
        </Link>
        <Link
          className={styles.login__link}
          href='/auth/forget'
        >
          パスワードを忘れた方はこちら
        </Link>
      </div>
    </div>
  );
};

export default Login;
