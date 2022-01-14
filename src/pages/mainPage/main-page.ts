import m from 'mithril';
import { display } from './components/display';
import { model } from './main-page-model';

export const mainPage: m.Component = {
    oninit: model.handleInit,
    view: (vnode: m.VnodeDOM): m.Children => {
        return m('section.main-container', [
            m('section.middle-row', [m(display)]),
        ]);
    },
};
