// my-page/[uid]/page.tsx

'use client';

import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React from 'react';
import { db } from '@/lib/firebase/config';

const UserPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (uid) {
      const getUserData = async () => {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };

      getUserData();
    }
  }, [uid]);

  return (
    <div>
      {user ? (
        <div>
          <p>{user.username}</p>
          <p>Email: {user.email}</p>
          <p>AI Type: {user.ai_type}</p>
          <p>AI Character: {user.ai_character}</p>
          <p>Favorite Color: {user.color}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserPage;
