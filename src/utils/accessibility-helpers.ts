import { ENTER_KEY_CODE } from 'constants/keyCodes';

export const extendButtonAttrs = (attrs: any) => {
    const { onclick } = attrs;
    if (!onclick) {
        return attrs;
    }
    return {
        ...attrs,
        onkeydown: (e: KeyboardEvent) => {
            if (e.keyCode === ENTER_KEY_CODE) {
                onclick();
            }
        },
    };
};
