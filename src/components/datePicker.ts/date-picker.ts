import { CALENDAR_ICON_SVG } from 'constants/icons';
import m from 'mithril';
import { extendButtonAttrs } from 'utils/accessibility-helpers';
import { model } from './date-picker-model';
import { ICalendarState, IDatePickerAttrs } from './types';

export const datePicker: m.Component<IDatePickerAttrs> = {
    oninit: model.handleInit,
    onremove: model.handleRemove,
    view: (vnode: m.VnodeDOM<IDatePickerAttrs>) => {
        const { selectedDate, onInput } = vnode.attrs;
        const { focused } = model;

        return m('.date-picker-container', [
            m('.icon', m.trust(CALENDAR_ICON_SVG)),
            m(
                `input.date-display ${focused ? 'focused' : ''}`,
                extendButtonAttrs({
                    onclick: () => model.handleInputClick(),
                    readonly: true,
                    value: selectedDate,
                    tabindex: 0,
                })
            ),
            focused && m(datePickerCalendar, { selectedDate, onInput }),
        ]);
    },
};

export const datePickerCalendar: m.Component<IDatePickerAttrs, ICalendarState> =
    {
        view: (vnode: m.VnodeDOM<IDatePickerAttrs, ICalendarState>) => {
            const { selectedDate, onInput } = vnode.attrs;
            return m('.date-calendar-container', []);
        },
    };
