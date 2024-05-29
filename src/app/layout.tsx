import { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
      <head>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <title>{metadata.title as React.ReactNode}</title>
        <meta
          name='description'
          content={metadata.description || undefined}
        />
      </head>
      <body className={styles.bodyWithFixedFooter}>
        <Header />
        <main className={styles.mainContent}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
