// src/components/NoTasksImage.tsx

import Image from 'next/image';
import React from 'react';
import styles from './NoTaskImage.module.scss';

interface NoTasksImageProps {
  text: string;
  imagePath: string;
}

const NoTasksImage: React.FC<NoTasksImageProps> = ({ text, imagePath }) => {
  return (
    <div className={styles.noList}>
      <p className={styles.noList__text}>{text}</p>
      <Image
        className={styles.noList__img}
        src={imagePath}
        alt='No tasks'
        width={300}
        height={300}
      />
    </div>
  );
};

export default NoTasksImage;
