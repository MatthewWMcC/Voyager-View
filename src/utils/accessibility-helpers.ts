import {
    DOWN_KEY_CODE,
    ENTER_KEY_CODE,
    LEFT_KEY_CODE,
    RIGHT_KEY_CODE,
    UP_KEY_CODE,
} from 'constants/keyCodes';

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

export const isNextPress = (e: KeyboardEvent) => {
    return e.keyCode === RIGHT_KEY_CODE || e.keyCode === DOWN_KEY_CODE;
};

export const isPrevPress = (e: KeyboardEvent) => {
    return e.keyCode === UP_KEY_CODE || e.keyCode === LEFT_KEY_CODE;
};
