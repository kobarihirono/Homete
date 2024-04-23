// Input.tsx

import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  type?: string;
  placeholder?: string;
  onChange?: () => void;
  className?: string;
}

// React.forwardRefを使用して書き換え
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder = 'Placeholder',
      onChange = () => console.log('Changed!'),
      className = '',
    },
    ref,
  ) => {
    const inputClass = `${styles.input} ${className ? styles[className] : ''}`;
    return (
      <>
        <input
          ref={ref}
          type={type}
          className={inputClass}
          onChange={onChange}
          placeholder={placeholder}
        />
      </>
    );
  },
);

Input.displayName = 'Input';

export default Input;
