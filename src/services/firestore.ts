import {} from 'firebase/firestore';
import { getDatabase, set, ref, get, onValue } from 'firebase/database';
import { firebaseConfig } from 'constants/keys';
import { initializeApp } from 'firebase/app';
import { getLocalId } from 'global/user';
import { removeNonAlphaNumbericChars } from 'utils/string-helpers';
import { store } from 'global/store';
import m from 'mithril';
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
    console.log(existingLikeList);
    const likeList = [
        ...(existingLikeList ? existingLikeList : []),
        getLocalId(),
    ];
    set(ref(db, cleanUrl), {
        url,
        likeList: likeList,
    });
};

export const unlikePhoto = async (url: string) => {
    const cleanUrl = removeNonAlphaNumbericChars(url);
    const existingLikeList = await getLikeList(cleanUrl);
    const likeList = [
        ...(existingLikeList ? existingLikeList : []),
        getLocalId(),
    ];
    set(ref(db, cleanUrl), {
        url,
        likeList: likeList,
    });
};

export const watchPost = (url: string) => {
    return onValue(ref(db, removeNonAlphaNumbericChars(url)), (dbData) => {
        console.log(dbData.val());
        const data = dbData.val();
        if (!data?.likeList) {
            store.postData = {
                ...store.postData,
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