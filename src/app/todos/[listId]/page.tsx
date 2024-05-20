// src/app/todos/[listId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import AddIcon from '../../components/elements/addIcon/AddIcon';
import TaskAddModal from '../../components/elements/modal/TaskAddModal';
import styles from './Todos.module.scss';
import ChangeHeader from '@/features/Todos/components/ChangeHeader/ChangeHeader';
import Todo from '@/features/Todos/components/Todo/Todo';
import { useFirebase } from '@/features/Todos/hooks/useFirebase';

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

const Todos = () => {
  const { listId } = useParams<{ listId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTab, setCurrentTab] = useState<'inProgress' | 'completed'>('inProgress');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchTasks, updateTask, deleteTask, toggleTaskCompleted } = useFirebase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    if (!listId) {
      setError('登録されたリストが見つかりませんでした。');
      return;
    }

    const loadTasks = async () => {
      setLoading(true);
      try {
        const fetchedTasks: Task[] = await fetchTasks(listId);
        setTasks(fetchedTasks);
      } catch (e) {
        setError('タスクの読み込みに失敗しました。後ほど再度お試しください。');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [listId]);

  const displayedTasks = tasks.filter((task) => task.completed === (currentTab === 'completed'));

  // タスク削除
  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId, listId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // タスク編集
  const handleEditTask = async (taskId: string, newName: string) => {
    if (newName !== '') {
      await updateTask(taskId, listId, { name: newName });
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, name: newName } : task,
      );
      setTasks(updatedTasks);
      setEditingId(null);
    }
  };

  // タスク完了
  const handleToggleCompleted = async (taskId: string, completed: boolean) => {
    await toggleTaskCompleted(taskId, listId, completed);
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: completed } : task,
    );
    setTasks(updatedTasks);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ChangeHeader
        onTabChange={setCurrentTab}
        currentTab={currentTab}
        tasks={tasks}
      />
      {displayedTasks.map((task) => (
        <Todo
          key={task.id}
          taskId={task.id}
          taskName={task.name}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onToggleCompleted={handleToggleCompleted}
          isEditing={task.id === editingId}
          editedName={editedName}
          setEditedName={setEditedName}
          setEditingId={setEditingId}
          completed={task.completed}
        />
      ))}
      <div
        className={styles.iconContainer}
        onClick={() => setIsModalOpen(true)}
      >
      <AddIcon />
      </div>
      <TaskAddModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        listId={listId}
      />
    </div>
  );
};

export default Todos;