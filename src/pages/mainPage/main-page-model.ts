import { store } from 'global/store';
import m from 'mithril';
import { updateLikes } from 'services/firestore';
import { getPicOfTheDay } from 'utils/api-helpers';

export const model = {
    handleInit: async (vnode: m.Vnode) => {
        const picOfTheDay = await getPicOfTheDay();
        updateLikes('this');
        store.imageData = picOfTheDay;
        m.redraw();
    },
};
