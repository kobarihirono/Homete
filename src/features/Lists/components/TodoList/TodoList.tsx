// TodoList.tsx

'use client';

import React, { useState } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import styles from './TodoList.module.scss';
import { useFirebase } from '@/features/Lists/hooks/useFirebase';

type TodoListProps = {
  listName: string;
  tasks: { id: string; name: string }[];
};

const TodoList: React.FC<TodoListProps> = ({ listName, tasks }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState('');
  const { updateList } = useFirebase();

  const handleEditClick = (index: number, taskName: string) => {
    setEditedTask(taskName);
    setEditIndex(index);
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask(event.target.value);
  };

  const saveTask = async () => {
    if (editIndex !== null) {
      const taskId = tasks[editIndex].id;
      await updateList(taskId, editedTask);
      setEditIndex(null);
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
  };

  return (
    <div className={styles.todoList__wrap}>
      <div className={styles.todoList}>
        <span className={styles.todoList__name}>{listName}</span>
        <div className={styles.todoList__tasks}>
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className={styles.task}
            >
              <span>{task.name}</span>
              <FiTrash2 className={styles.icons__delete} />
              {editIndex === index ? (
                <div>
                  <input
                    type='text'
                    value={editedTask}
                    onChange={handleTaskChange}
                    autoFocus
                  />
                  <button onClick={saveTask}>保存</button>
                  <button onClick={cancelEdit}>戻る</button>
                </div>
              ) : (
                <div className={styles.icons}>
                  <FiEdit2
                    className={styles.icons__edit}
                    onClick={() => handleEditClick(index, task.name)}
                  />
                  <FiTrash2 className={styles.icons__delete} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
