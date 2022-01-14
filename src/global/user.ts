import uniqid from 'uniqid';

export const setLocalId = () => {
    if (!getLocalId()) {
        localStorage.setItem('id', uniqid());
    }
};

export const getLocalId = () => {
    return localStorage.getItem('id');
};
