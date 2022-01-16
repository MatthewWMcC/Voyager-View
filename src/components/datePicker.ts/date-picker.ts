import { dropdown } from 'components/dropdown/dropdown';
import { CALENDAR_ICON_SVG } from 'constants/icons';
import m from 'mithril';
import { extendButtonAttrs } from 'utils/accessibility-helpers';
import { model } from './date-picker-model';
import { ICalendarState, IDatePickerAttrs } from './types';
import uniqid from 'uniqid';
import {
    convertMonthNumToString,
    getCalendarRows,
    getYearOptions,
} from 'utils/date-helpers';

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
        oninit: model.handleCalendarInit,
        view: (vnode: m.VnodeDOM<IDatePickerAttrs, ICalendarState>) => {
            const { selectedDate } = vnode.attrs;
            const {
                monthOptions,
                yearOptions,
                selectedMonth,
                selectedYear,
                tempDate,
            } = vnode.state;
            return m('.date-calendar-container', [
                m('.top-calendar-row', [
                    m(
                        '.month-dropdown',
                        m(dropdown, {
                            id: uniqid(),
                            options: monthOptions,
                            selectedValue:
                                convertMonthNumToString(selectedMonth),
                            onInput: (month: string) =>
                                model.handleSelectMonth(month, vnode),
                        })
                    ),
                    m(
                        '.year-dropdown',
                        m(dropdown, {
                            id: uniqid(),
                            options: yearOptions,
                            selectedValue: selectedYear.toString(),
                            onInput: (year: string) =>
                                model.handleSelectYear(year, vnode),
                        })
                    ),
                ]),
                m(
                    '.middle-calendar-row',
                    getCalendarRows(
                        selectedMonth,
                        selectedYear,
                        tempDate,
                        (date: string) =>
                            model.handleSelectTempDate(date, vnode)
                    )
                ),
                m('.bottom-calendar-row', [
                    m(
                        'button.btn-styled.small',
                        extendButtonAttrs({
                            onclick: model.handleUnfocus,
                        }),
                        'Cancel'
                    ),
                    m(
                        'button.btn-styled.small',
                        extendButtonAttrs({
                            onclick: () => model.handleApply(vnode),
                        }),
                        'Apply'
                    ),
                ]),
            ]);
        },
    };
