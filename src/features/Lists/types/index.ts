// src/app/lists/page.tsx

export type Task = string;

export type TaskList = {
  id: string;
  name: string;
  tasks: Task[];
};
