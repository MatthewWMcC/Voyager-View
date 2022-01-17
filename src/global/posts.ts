import { watchPost } from 'services/firestore';
import { getPicOfTheDay } from 'utils/api-helpers';
import m from 'mithril';
import { store } from './store';

let unsubscribe;

export const fetchPost = async (date: string) => {
    if (unsubscribe) {
        unsubscribe();
    }
    try {
        const picOfTheDay = await getPicOfTheDay(date);
        store.imageData = picOfTheDay;
        const { url } = store.imageData;
        if (url) {
            unsubscribe = watchPost(url);
        }
        store.fetchError = false;
    } catch (e) {
        store.fetchError = true;
    }

    m.redraw();
};
