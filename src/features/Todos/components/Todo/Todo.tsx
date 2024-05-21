// Todo.tsx

import React, { useRef, useEffect } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import styles from './Todo.module.scss';

interface TodoProps {
  taskId: string;
  taskName: string;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newName: string) => void;
  onToggleCompleted: (taskId: string, completed: boolean) => void;
  isEditing: boolean;
  editedName: string;
  setEditedName: (name: string) => void;
  setEditingId: (id: string | null) => void;
  completed: boolean;
}

const Todo: React.FC<TodoProps> = ({
  taskId,
  taskName,
  onDelete,
  onEdit,
  onToggleCompleted,
  isEditing,
  editedName,
  setEditedName,
  setEditingId,
  completed,
}) => {
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const taskNameClass = completed ? `${styles.todo__name} ${styles.completed}` : styles.todo__name;

  return (
    <div className={styles.todo__wrap}>
      <div className={styles.todo}>
        <div className={styles.todo__inner}>
          <input
            type='checkbox'
            className={styles.todo__checkbox}
            checked={completed}
            onChange={(e) => onToggleCompleted(taskId, e.target.checked)}
          />
          {isEditing ? (
            <input
              ref={editInputRef}
              type='text'
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={() => onEdit(taskId, editedName)}
              onKeyPress={(e) => e.key === 'Enter' && onEdit(taskId, editedName)}
              className={styles.todo__editInput}
            />
          ) : (
            <span
              className={taskNameClass}
              onDoubleClick={() => {
                setEditingId(taskId);
                setEditedName(taskName);
              }}
            >
              {taskName}
            </span>
          )}
        </div>
        <div className={styles.icons}>
          <FiEdit2
            className={styles.icons__edit}
            onClick={() => {
              setEditingId(taskId);
              setEditedName(taskName);
            }}
          />
          <FiTrash2
            className={styles.icons__delete}
            onClick={() => onDelete(taskId)}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
