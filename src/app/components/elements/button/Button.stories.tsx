// Button.stories.tsx

import { Meta } from '@storybook/react';
import React from 'react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

export const Primary = () => (
  <Button
    label='Primary'
    onClick={() => console.log('Primary clicked!')}
    className='primary'
  />
);

export const Secondary = () => (
  <Button
    label='Secondary'
    onClick={() => console.log('Secondary clicked!')}
    className='secondary'
  />
);

export const Disabled = () => (
  <Button
    label='Disabled'
    onClick={() => console.log('Disabled clicked!')}
    className='disabled'
  />
);
