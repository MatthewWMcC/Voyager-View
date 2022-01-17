import { ENTER_KEY_CODE } from 'constants/keyCodes';
import m from 'mithril';
import { isNextPress, isPrevPress } from 'utils/accessibility-helpers';
import { IDropdownAttrs, IDropdownState } from './types';

export const model = {
    handleInit: (vnode: m.VnodeDOM<IDropdownAttrs, IDropdownState>) => {
        vnode.state.open = false;
        vnode.state.index = -1;
    },
    handleRemove: (vnode: m.VnodeDOM<IDropdownAttrs, IDropdownState>) => {},
    handleInputClick: (vnode: m.VnodeDOM<IDropdownAttrs, IDropdownState>) => {
        if (vnode.state.open) {
            model.handleBlur(vnode);
        } else {
            model.handleFocus(vnode);
        }
    },
    handleFocus: (vnode: m.VnodeDOM<IDropdownAttrs, IDropdownState>) => {
        vnode.state.open = true;
        m.redraw();
    },
    handleBlur: (vnode: m.VnodeDOM<IDropdownAttrs, IDropdownState>) => {
        vnode.state.open = false;
        vnode.state.index = -1;
        m.redraw();
    },
    handleKeyPress: (
        vnode: m.VnodeDOM<IDropdownAttrs, IDropdownState>,
        e: KeyboardEvent
    ) => {
        const { options } = vnode.attrs;
        const { open, index } = vnode.state;
        const length = options.length;
        if (e.keyCode === ENTER_KEY_CODE) {
            if (index === -1) {
                model.handleInputClick(vnode);
            } else {
                model.handleSelectOption(vnode, options[index].value);
            }
        } else if (open && isNextPress(e)) {
            e.preventDefault();
            vnode.state.index = index < length - 1 ? index + 1 : -1;
        } else if (open && isPrevPress(e)) {
            e.preventDefault();

            vnode.state.index = index >= 0 ? index - 1 : length - 1;
        } else if (e.keyCode === 9) {
            model.handleBlur(vnode);
        }
        m.redraw();
    },
    handleSelectOption: (
        vnode: m.VnodeDOM<IDropdownAttrs, IDropdownState>,
        value: string
    ) => {
        const { onInput } = vnode.attrs;
        onInput(value);
        model.handleBlur(vnode);
    },
};
