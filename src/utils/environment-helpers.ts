const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

export const getBaseUrl = () => {
    return isDevelopment ? 'http://localhost:3000' : 'https://someurl';
};
