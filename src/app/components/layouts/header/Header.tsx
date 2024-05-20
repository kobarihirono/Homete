// src/app/components/layouts/header/Header.tsx

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import styles from './Header.module.scss';
import { useAuth } from '@/lib/firebase/hooks/useAuth';

const Header = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <MdKeyboardArrowLeft
            onClick={handleBack}
            className={styles.header__icon}
          />
        </div>
        <h1 className={styles.header__title}>Homete!</h1>
        {currentUser ? (
          <Link href={`/my-page/${currentUser.uid}`}>
            <FaRegUserCircle className={styles.header__icon} />
          </Link>
        ) : (
          <FaRegUserCircle className={styles.header__icon} />
        )}
      </header>
    </>
  );
};

export default Header;
