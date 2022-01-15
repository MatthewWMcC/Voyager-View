import m from 'mithril';
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
};
