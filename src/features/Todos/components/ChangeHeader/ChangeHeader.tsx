// Todos/components/ChangeHeader/ChangeHeader.tsx

import React from 'react';
import styles from './ChangeHeader.module.scss';

interface ChangeHeaderProps {
  onTabChange: (tab: 'inProgress' | 'completed') => void;
  currentTab: 'inProgress' | 'completed';
  tasks: Array<{ id: string; name: string; completed: boolean }>;
}

const ChangeHeader = ({ onTabChange, currentTab, tasks }: ChangeHeaderProps) => {
  const countInProgress = tasks.filter((task) => !task.completed).length;
  const countCompleted = tasks.filter((task) => task.completed).length;

  const getTabStyle = (tabName: 'inProgress' | 'completed') => ({
    flex: 1,
    fontWeight: currentTab === tabName ? 'bold' : 'normal',
    color: currentTab === tabName ? '#333' : '#666',
    backgroundColor: currentTab === tabName ? 'transparent' : '#e0e0e0',
  });

  return (
    <div className={styles.changeHeader}>
      <div
        className={styles.changeHeader__tab}
        style={getTabStyle('inProgress')}
        onClick={() => onTabChange('inProgress')}
      >
        <p className={styles.changeHeader__tabTitle}>進行中（{countInProgress}）</p>
      </div>
      <div
        className={styles.changeHeader__tab}
        style={getTabStyle('completed')}
        onClick={() => onTabChange('completed')}
      >
        <p className={styles.changeHeader__tabTitle}>完了（{countCompleted}）</p>
      </div>
    </div>
  );
};

export default ChangeHeader;
