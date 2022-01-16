import { NasaApiKey } from 'constants/keys';
import { PIC_OF_THE_DAY_URL } from 'constants/misc';

export const getPicOfTheDay = (date: string) => {
    return doGetRequest<any>(PIC_OF_THE_DAY_URL + NasaApiKey + '&date=' + date);
};

const doGetRequest = <T>(url: string): Promise<T> => {
    return fetch(url, {
        method: 'GET',
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    });
};
