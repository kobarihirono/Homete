import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className={styles.footer}>
        <p className={styles.footer__copy}>
          &copy;{currentYear} hirono kobari. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
