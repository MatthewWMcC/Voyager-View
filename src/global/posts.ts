import { watchPost } from 'services/firestore';
import { getPicOfTheDay } from 'utils/api-helpers';
import m from 'mithril';
import { store } from './store';

let unsubscribe;

export const fetchPost = async (date: string) => {
    const picOfTheDay = await getPicOfTheDay(date);
    store.imageData = picOfTheDay;
    const { url } = store.imageData;
    if (unsubscribe) {
        unsubscribe();
    }
    if (url) {
        unsubscribe = watchPost(url);
    }
    m.redraw();
};
