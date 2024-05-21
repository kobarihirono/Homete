// src/app/components/elements/modal/CompletedModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import styles from './Modal.module.scss';
import OpenAI from 'openai';
import { CreateChatCompletionResponse } from 'openai';
import { useAuth } from '@/lib/firebase/hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface CompletedModalProps {
  taskName: string;
  onClose: () => void;
}

interface UserData {
  username: string;
  email: string;
  ai_type: string;
  ai_character: string;
  color: string;
}

const CompletedModal: React.FC<CompletedModalProps> = ({ taskName, onClose }) => {
  const { currentUser } = useAuth();
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userSettings, setUserSettings] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserSettings = async () => {
      if (currentUser && currentUser.uid) {
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data() as UserData;
          setUserSettings(userData);
        }
      }
    };

    fetchUserSettings();
  }, [currentUser]);

  const fetchAiResponse = async (taskName: string, aiType: string, aiCharacter: string) => {
    setIsLoading(true);
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
      });

      const messageContent = `今からあなたは${aiCharacter}な${aiType}になりきって50文字以内で私を褒めてください。${taskName} のタスクを完了しました。`;

      const response: CreateChatCompletionResponse = await openai.chat.completions.create({
        messages: [{ role: 'user', content: messageContent }],
        model: 'gpt-3.5-turbo',
      });

      setAiResponse(response.choices[0].message?.content || 'No response content');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse('Sorry, an error occurred while fetching response.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (taskName.trim() && userSettings) {
      fetchAiResponse(taskName, userSettings.ai_type, userSettings.ai_character);
    }
  }, [taskName, userSettings]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{isLoading ? 'Loading...' : aiResponse}</p>
        <div className={styles.modal__buttons}>
          <Button
            label='閉じる'
            type='button'
            className='close'
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default CompletedModal;
