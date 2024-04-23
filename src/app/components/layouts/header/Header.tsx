// src/app/components/layouts/header/Header.tsx

import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import { useAuth } from '@/lib/firebase/hooks/useAuth';

const Header = () => {
  // const { currentUser, loading } = useAuth();

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Homete!</h1>
        {/* {currentUser && (
          <Link href={`/my-page/${currentUser.uid}`}>マイページ</Link>
        )} */}
      </header>
    </>
  );
};

export default Header;
