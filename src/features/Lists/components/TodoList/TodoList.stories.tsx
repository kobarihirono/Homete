// TodoList.stories.tsx

import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import TodoList from './TodoList';

export default {
  title: 'Components/TodoList',
  component: TodoList,
} as Meta;

const Template: StoryFn = (args) => <TodoList {...args} />;

export const Default = Template.bind({});
Default.args = {
  listName: 'My Todo List',
};
