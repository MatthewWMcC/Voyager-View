import { IOption } from 'global/types';

export interface IDatePickerAttrs {
    selectedDate: string;
    onInput: (date: string) => void;
}

export interface ICalendarState {
    selectedMonth: number;
    selectedYear: number;
    tempDate: string;
    monthOptions: IOption[];
    yearOptions: IOption[];
}
