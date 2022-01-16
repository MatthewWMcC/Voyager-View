import { daysOfTheWeek, DAYS_IN_A_WEEK } from 'constants/date';
import m from 'mithril';
import { extendButtonAttrs } from './accessibility-helpers';

export const getDateString = (locale: string) => {
    return localeDateToStandardFormat(locale);
};

export const convertMonthNumToString = (monthId: number) => {
    return (monthId + 1).toString().padStart(2, '0');
};

const getLastTenYears = () => {
    const currentYear = new Date().getFullYear();
    return new Array(10).fill('0').map((_, i) => {
        return currentYear - i;
    });
};

export const getYearOptions = () => {
    return getLastTenYears().map((year) => {
        const yearText = year.toString();
        return {
            value: yearText,
            text: yearText,
        };
    });
};

export const getCalendarRows = (
    selectedMonth: number,
    selectedYear: number,
    selectedDate: string,
    onSelect: (date: string) => void
) => {
    const daysOffset = new Date(selectedYear, selectedMonth, 1).getDay();
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const weekRows = Math.ceil((daysOffset + daysInMonth) / 7);
    let day = -daysOffset + 1;
    const dayRows = [];
    for (let i = 1; i <= weekRows; i++) {
        const dayRow = [];
        for (let j = 0; j <= DAYS_IN_A_WEEK; j++) {
            const dateVal = new Date(
                selectedYear,
                selectedMonth,
                day
            ).getDate();

            const dateString = convertNumsToDateString(
                selectedYear,
                selectedMonth,
                day
            );
            const isInactive = day <= 0 || day > daysInMonth;
            const isSelected = dateString === selectedDate;

            dayRow.push(
                m(
                    'td',
                    m(
                        `button.td-button${isInactive ? '.disabled' : ''}${
                            isSelected ? '.selected' : ''
                        }`,
                        extendButtonAttrs({
                            onclick: () => onSelect(dateString),
                            tabindex: isInactive ? -1 : 0,
                            disabled: isInactive,
                        }),
                        dateVal
                    )
                )
            );
            day += 1;
        }
        dayRows.push(m('tr.main-row', dayRow));
    }

    return m('table.calendar-rows', [
        m(
            'tr.header-row',
            daysOfTheWeek.map((dayOfTheWeek) => {
                return m('td', m('label', dayOfTheWeek));
            })
        ),
        ...dayRows,
    ]);
};

const convertNumsToDateString = (
    year: number,
    month: number,
    day: number
): string => {
    return (
        year.toString() +
        '-' +
        convertMonthNumToString(month) +
        '-' +
        day.toString().padStart(2, '0')
    );
};

const localeDateToStandardFormat = (locale: string): string => {
    const [month, date, year] = locale.split('/');
    return `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`;
};
