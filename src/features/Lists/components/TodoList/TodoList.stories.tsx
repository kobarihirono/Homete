// TodoList.stories.tsx

import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import TodoList, { TodoListProps } from './TodoList';

export default {
  title: 'Components/TodoList',
  component: TodoList,
} as Meta;

const Template: StoryFn<TodoListProps> = (args) => <TodoList {...args} />;

export const Default = Template.bind({});
Default.args = {
  listName: 'My Todo List',
  tasks: [
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true },
  ],
};
