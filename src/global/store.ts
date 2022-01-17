import { getDateString } from 'utils/date-helpers';

export const store = {
    postData: { likes: 0, liked: false, loading: true },
    date: getDateString(new Date().toLocaleDateString()),
    fetchError: false,
    imageData: {},
};
