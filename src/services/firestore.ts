import {} from 'firebase/firestore';
import { getDatabase, set, ref } from 'firebase/database';

import { firebaseConfig } from 'constants/keys';
import { initializeApp } from 'firebase/app';
const app = initializeApp(firebaseConfig);

const db = getDatabase();

export const updateLikes = (url: string) => {
    set(ref(db, url), {
        url,
        likes: 11,
    });
};
