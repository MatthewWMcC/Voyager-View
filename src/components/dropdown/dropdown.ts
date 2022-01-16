import { CARET_DOWN, CARET_UP } from 'constants/icons';
import m from 'mithril';
import { model } from './dropdown-model';
import { IDropdownAttrs, IDropdownState } from './types';

export const dropdown: m.Component<IDropdownAttrs, IDropdownState> = {
    oninit: model.handleInit,
    onremove: model.handleRemove,
    view: (vnode: m.VnodeDOM<IDropdownAttrs, IDropdownState>) => {
        const { options, selectedValue, onInput, id } = vnode.attrs;
        const { open, index } = vnode.state;
        return m(`.dropdown-container#${id}.${id}`, [
            m(`input.select-options${open ? '.open' : ''}`, {
                onclick: () => model.handleInputClick(vnode),
                onkeydown: (e: KeyboardEvent) => model.handleKeyPress(vnode, e),
                readonly: true,
                value: options.find((option) => option.value === selectedValue)
                    ?.text,
                tabindex: 0,
                placeholder: '',
            }),
            m('.dropdown-icon', m.trust(open ? CARET_UP : CARET_DOWN)),
            open &&
                m(
                    '.dropdown-options',
                    options.map(({ value, text }, i) => {
                        return m(
                            `.dropdown-option${
                                selectedValue === value ? '.selected' : ''
                            }${index === i ? '.focused' : ''}`,
                            {
                                onclick: () =>
                                    model.handleSelectOption(vnode, value),
                            },
                            text
                        );
                    })
                ),
        ]);
    },
};
