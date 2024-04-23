// Input.stories.tsx

import React from 'react';
import { Meta } from '@storybook/react';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta;

// メインのストーリーでプロップスを指定
export const Main = () => <Input />;

// パスワードタイプのインプットの例
export const Password = () => (
  <Input
    type='password'
    placeholder='Enter password...'
  />
);

// カスタムクラス名を使用した例
export const Large = () => (
  <Input
    className='large'
    placeholder='Large input style'
  />
);
