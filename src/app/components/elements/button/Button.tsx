// Button.tsx

import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  label = 'Label',
  onClick,
  className = '',
  type = 'submit',
}) => {
  const buttonClass = `${styles.button} ${styles[className] || ''}`;

  return (
    <div>
      <button
        className={buttonClass}
        onClick={onClick}
        type={type}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
