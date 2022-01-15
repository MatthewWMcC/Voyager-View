export const removeNonAlphaNumbericChars = (str: string) => {
    let rgx = new RegExp('[^a-zA-Z0-9 -]');
    return str.split(rgx).join('');
};
