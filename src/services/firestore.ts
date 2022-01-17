import {} from 'firebase/firestore';
import { getDatabase, set, ref, get, onValue } from 'firebase/database';
import { firebaseConfig } from 'constants/keys';
import { initializeApp } from 'firebase/app';
import { getLocalId } from 'global/user';
import { removeNonAlphaNumbericChars } from 'utils/string-helpers';
import { store } from 'global/store';
import m from 'mithril';
import { baseStoreData } from 'constants/storeData';
const app = initializeApp(firebaseConfig);

const db = getDatabase();

const getLikeList = async (url: string): Promise<Array<string>> => {
    return get(ref(db, removeNonAlphaNumbericChars(url))).then(
        (obj) => obj.val()?.likeList || []
    );
};

export const likePhoto = async (url: string) => {
    const cleanUrl = removeNonAlphaNumbericChars(url);
    const existingLikeList = await getLikeList(cleanUrl);
    const likeList = [
        ...(existingLikeList ? existingLikeList : []),
        getLocalId(),
    ];
    set(ref(db, cleanUrl), {
        url,
        likeList,
    });
};

export const unlikePhoto = async (url: string) => {
    const cleanUrl = removeNonAlphaNumbericChars(url);
    const existingLikeList = await getLikeList(cleanUrl);
    const likeList = existingLikeList.filter((like) => like !== getLocalId());
    set(ref(db, cleanUrl), {
        url,
        likeList,
    });
};

export const watchPost = (url: string) => {
    return onValue(ref(db, removeNonAlphaNumbericChars(url)), (dbData) => {
        const data = dbData.val();
        if (!data?.likeList) {
            store.postData = {
                ...baseStoreData,
                loading: false,
            };
            m.redraw();
            return;
        }
        const likes = data.likeList.length;
        const liked = data.likeList.includes(getLocalId());
        store.postData = {
            likes,
            liked,
            loading: false,
        };
        m.redraw();
    });
};
