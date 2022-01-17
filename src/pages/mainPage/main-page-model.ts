import { fetchPost } from 'global/posts';
import { store } from 'global/store';
import m from 'mithril';
import { getNewDay } from 'utils/date-helpers';
import { IMainPageState } from './types';

export const model = {
    handleInit: async (vnode: m.Vnode<{}, IMainPageState>) => {
        const { date } = store;
        fetchPost(date);
        model.setPrevNextDay(vnode);
    },
    handleChangeDate: (date: string, vnode: m.VnodeDOM<{}, IMainPageState>) => {
        store.date = date;
        fetchPost(date);
        model.setPrevNextDay(vnode);
        m.redraw();
    },
    setPrevNextDay: (vnode: m.Vnode<{}, IMainPageState>) => {
        const { date } = store;
        vnode.state.prevDay = getNewDay(date, -1);
        vnode.state.nextDay = getNewDay(date, 1);
    },
};
