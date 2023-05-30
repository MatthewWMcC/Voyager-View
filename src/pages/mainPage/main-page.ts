import { datePicker } from 'components/datePicker.ts/date-picker';
import { CARET_LEFT, CARET_RIGHT } from 'constants/icons';
import { store } from 'global/store';
import m from 'mithril';
import { extendButtonAttrs } from 'utils/accessibility-helpers';
import { display } from './components/display';
import { model } from './main-page-model';
import { IMainPageState } from './types';

export const mainPage: m.Component = {
    oninit: model.handleInit,
    view: (vnode: m.VnodeDOM<{}, IMainPageState>): m.Children => {
        const { date, fetchError } = store;
        const { nextDay, prevDay } = vnode.state;
        const nextEnabled = new Date() > new Date(nextDay.replace('-', '/'));
        return m('section.main-container', [
            m('section.top-row', [
                m(
                    '.logo',
                    m('img', {
                        src: 'https://storage.cloud.google.com/kerbal-view.appspot.com/Voyager-logo.png',
                    })
                ),
                m(
                    '.date-picker-outer',
                    m(datePicker, {
                        selectedDate: date,
                        onInput: (date: string) =>
                            model.handleChangeDate(date, vnode),
                    })
                ),
            ]),
            m('.subtitle', "Powered by Nasa's Photo of the Day API"),
            !fetchError &&
                m('section.button-row', [
                    m(
                        'button.arrow-button.btn-styled.secondary',
                        extendButtonAttrs({
                            onclick: () =>
                                model.handleChangeDate(prevDay, vnode),
                        }),
                        m.trust(CARET_LEFT)
                    ),
                    m('.space'),
                    m(
                        `button.arrow-button.btn-styled.secondary${
                            nextEnabled ? '' : '.disabled'
                        }`,
                        extendButtonAttrs({
                            onclick: () =>
                                model.handleChangeDate(nextDay, vnode),
                            disabled: !nextEnabled,
                        }),
                        m.trust(CARET_RIGHT)
                    ),
                ]),
            m('section.middle-row', [
                !fetchError && m(display),
                fetchError &&
                    m(
                        '.error-display',
                        m(
                            'h3.',
                            'Could not fetch image data for the selected date.'
                        ),
                        m('h3.', 'Please select another current or past date.')
                    ),
            ]),
        ]);
    },
};
