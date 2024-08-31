// archivo de configuraciones
const PAGE_URL = process.env.NODE_ENV === 'production'
    ? 'placeholder'
    : 'http://localhost:3003';

    const MONGO_URL = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URL_PROD
    : process.env.MONGO_URL_TEST
 
 
module.exports = { PAGE_URL, MONGO_URL };
