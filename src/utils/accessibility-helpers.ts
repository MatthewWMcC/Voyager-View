import { ENTER_KEY_CODE } from 'constants/keyCodes';

export const extendButtonAttrs = (attrs: any, onActivate: any) => {
    return {
        ...attrs,
        onclick: onActivate,
        onkeydown: (e: KeyboardEvent) => {
            if (e.keyCode === ENTER_KEY_CODE) {
                onActivate;
            }
        },
    };
};
