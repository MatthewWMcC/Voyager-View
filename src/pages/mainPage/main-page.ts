import { datePicker } from 'components/datePicker.ts/date-picker';
import { store } from 'global/store';
import m from 'mithril';
import { display } from './components/display';
import { model } from './main-page-model';

export const mainPage: m.Component = {
    oninit: model.handleInit,
    view: (vnode: m.VnodeDOM): m.Children => {
        const { date } = store;
        return m('section.main-container', [
            m('section.top-row', [
                m('.logo'),
                m(
                    '.date-picker-outer',
                    m(datePicker, {
                        selectedDate: date,
                        onInput: model.handleChangeDate,
                    })
                ),
            ]),
            m('section.middle-row', [m(display)]),
        ]);
    },
};
