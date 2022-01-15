import { IOption } from 'global/types';

export interface IDropdownAttrs {
    id: string;
    options: IOption[];
    selectedValue: string;
    onInput: (value: string) => void;
}
export interface IDropdownState {
    index: number;
    open: boolean;
}
