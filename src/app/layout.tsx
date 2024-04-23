import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import '../styles/reset.css';
import styles from '../styles/layout.module.scss';
import Footer from './components/layouts/footer/Footer';
import Header from './components/layouts/header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Homete!',
  description: 'Todo リストのタスクを完了すると、自分好みの AI が褒めてくれるタスク管理アプリです',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={styles.html}
      lang='ja'
    >
      <Head>
        <title>{metadata.title as React.ReactNode}</title>
        <meta
          name='description'
          content={metadata.description || undefined}
        />
      </Head>
      <body className={styles.bodyWithFixedFooter}>
        <Header />
        <main className={styles.mainContent}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
