import { fetchPost } from 'global/posts';
import { store } from 'global/store';
import m from 'mithril';

export const model = {
    handleInit: async (vnode: m.Vnode) => {
        const { date } = store;
        fetchPost(date);
    },
    handleChangeDate: (date: string) => {
        store.date = date;
        fetchPost(date);
        m.redraw();
    },
};
