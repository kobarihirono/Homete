// my-page/[uid]/page.tsx

'use client';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import Button from '../../components/elements/button/Button';
import styles from './MyPage.module.scss';
import { logout } from '@/lib/firebase/apis/auth';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/lib/firebase/hooks/useAuth';

interface UserData {
  username: string;
  email: string;
  ai_type: string;
  ai_character: string;
  color: string;
}

const UserPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [user, setUser] = React.useState<UserData | null>(null);
  const [isEditing, setIsEditing] = React.useState({
    ai_type: false,
    ai_character: false,
    color: false,
  });
  const selectRefs = {
    ai_type: useRef<HTMLSelectElement>(null),
    ai_character: useRef<HTMLSelectElement>(null),
    color: useRef<HTMLSelectElement>(null),
  };

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const getUserData = async () => {
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data() as UserData;
          setUser(userData);
        } else {
          console.log('No such document!');
        }
      };

      getUserData();
    }
  }, [currentUser]);

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (currentUser && currentUser.uid) {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { [name]: value });
      setUser(prev => prev ? { ...prev, [name]: value } : prev);
      setIsEditing(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleEditClick = (field: string) => {
    setIsEditing({
      ...isEditing,
      [field]: true,
    });
  };

  const handleClickOutside = (e: MouseEvent) => {
    Object.keys(selectRefs).forEach(field => {
      const ref = selectRefs[field as keyof typeof selectRefs].current;
      if (ref && !ref.contains(e.target as Node)) {
        setIsEditing(prev => ({ ...prev, [field]: false }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if (result.isSuccess) {
      router.push('/auth/login');
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      {user ? (
        <div className={styles.my_page}>
          <h1 className={styles.my_page__title}>マイページ</h1>
          <ul className={styles.my_page__list}>
            <li className={styles.my_page__list_item}>
              <p>ユーザー名</p>
              <p className={styles.my_page__list_item_text}>{user.username}</p>
            </li>
            <li className={styles.my_page__list_item}>
              <p>メールアドレス</p>
              <p className={styles.my_page__list_item_text}>{user.email}</p>
            </li>
            <li className={styles.my_page__list_item}>
              <p>AIの種類</p>
              <div className={styles.my_page__list_item_inner}>
                {isEditing.ai_type ? (
                  <select
                    ref={selectRefs.ai_type}
                    name="ai_type"
                    value={user.ai_type}
                    onChange={handleSelectChange}
                  >
                    <option value="猫">猫</option>
                    <option value="犬">犬</option>
                    <option value="お姉さん">お姉さん</option>
                    <option value="お兄さん">お兄さん</option>
                  </select>
                ) : (
                  <>
                    <p className={styles.my_page__list_item_text}>{user.ai_type}</p>
                    <FiEdit2
                      className={styles.my_page__list_item_icon}
                      onClick={() => handleEditClick('ai_type')}
                    />
                  </>
                )}
              </div>
            </li>
            <li className={styles.my_page__list_item}>
              <p>AIの性格</p>
              <div className={styles.my_page__list_item_inner}>
                {isEditing.ai_character ? (
                  <select
                    ref={selectRefs.ai_character}
                    name="ai_character"
                    value={user.ai_character}
                    onChange={handleSelectChange}
                  >
                    <option value="優しい">優しい</option>
                    <option value="わんぱく">わんぱく</option>
                    <option value="紳士">紳士</option>
                    <option value="知的">知的</option>
                  </select>
                ) : (
                  <>
                    <p className={styles.my_page__list_item_text}>{user.ai_character}</p>
                    <FiEdit2
                      className={styles.my_page__list_item_icon}
                      onClick={() => handleEditClick('ai_character')}
                    />
                  </>
                )}
              </div>
            </li>
            <li className={styles.my_page__list_item}>
              <p>使用する色</p>
              <div className={styles.my_page__list_item_inner}>
                {isEditing.color ? (
                  <select
                    ref={selectRefs.color}
                    name="color"
                    value={user.color}
                    onChange={handleSelectChange}
                  >
                    <option value="Orange">Orange</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                  </select>
                ) : (
                  <>
                    <p className={styles.my_page__list_item_text}>{user.color}</p>
                    <FiEdit2
                      className={styles.my_page__list_item_icon}
                      onClick={() => handleEditClick('color')}
                    />
                  </>
                )}
              </div>
            </li>
          </ul>
          <div className={styles.my_page__button}>
            <Button
              label='ログアウト'
              type='button'
              className='back'
              onClick={handleLogout}
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserPage;
