import { months } from 'constants/date';
import m from 'mithril';
import { convertMonthNumToString, getYearOptions } from 'utils/date-helpers';
import { ICalendarState, IDatePickerAttrs } from './types';
export const model = {
    focused: false,
    handleInit: () => {
        document.addEventListener('click', model.handleDocClick);
    },
    handleRemove: () => {
        document.removeEventListener('click', model.handleDocClick);
    },
    handleInputClick: () => {
        model.focused = !model.focused;
        m.redraw();
    },
    handleDocClick: (e: Event) => {
        const DatePickerContainer = document.querySelector(
            '.date-picker-container'
        );
        if (
            model.focused &&
            !DatePickerContainer?.contains(e.target as HTMLLIElement)
        ) {
            model.focused = false;
            m.redraw();
        }
    },
    handleCalendarInit: (
        vnode: m.VnodeDOM<IDatePickerAttrs, ICalendarState>
    ) => {
        const { selectedDate } = vnode.attrs;
        vnode.state.selectedYear = parseInt(selectedDate.slice(0, 4));
        vnode.state.selectedMonth = parseInt(selectedDate.slice(5, 7)) - 1;
        vnode.state.tempDate = vnode.attrs.selectedDate;

        vnode.state.monthOptions = months.map((month, i) => {
            return {
                text: month,
                value: convertMonthNumToString(i),
            };
        });
        vnode.state.yearOptions = getYearOptions();
    },
    handleSelectMonth: (
        month: string,
        vnode: m.VnodeDOM<IDatePickerAttrs, ICalendarState>
    ) => {
        vnode.state.selectedMonth = parseInt(month) - 1;
        m.redraw();
    },
    handleSelectYear: (
        year: string,
        vnode: m.VnodeDOM<IDatePickerAttrs, ICalendarState>
    ) => {
        vnode.state.selectedYear = parseInt(year);
        m.redraw();
    },
    handleSelectTempDate: (
        date: string,
        vnode: m.VnodeDOM<IDatePickerAttrs, ICalendarState>
    ) => {
        vnode.state.tempDate = date;
        m.redraw();
    },
    handleApply: (vnode: m.VnodeDOM<IDatePickerAttrs, ICalendarState>) => {
        const { onInput } = vnode.attrs;
        const { tempDate } = vnode.state;
        onInput(tempDate);
        model.handleUnfocus();
    },
    handleGoToToday: (
        vnode: m.VnodeDOM<IDatePickerAttrs, ICalendarState>
    ) => {},
    handleUnfocus: () => {
        model.focused = false;
        m.redraw();
    },
};
