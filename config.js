
const dotenv = require('dotenv').config();

const config = {
    // dbUri: 'mongodb://localhost:27017/doctorportal',
    dbUri: process.env.MONGODB_URI,
    jwt: {
        expiration: '1d',
        secret: process.env.TOKEN_SECRECT
    },
}
module.exports = config;
