// src/app/components/elements/modal/CompletedModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import styles from './Modal.module.scss';
import OpenAI from 'openai';
import { CreateChatCompletionResponse } from 'openai';

interface CompletedModalProps {
  taskName: string;
  onClose: () => void;
}

const CompletedModal: React.FC<CompletedModalProps> = ({ taskName, onClose }) => {
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchAiResponse = async (taskName: string) => {
    setIsLoading(true);
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response: CreateChatCompletionResponse = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `${taskName} を完了しました。50文字以内で褒めてください。` }],
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
    if (taskName.trim()) {
      fetchAiResponse(taskName);
    }
  }, [taskName]);

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
