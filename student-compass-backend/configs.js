require('dotenv').config()

module.exports = {
    'mongoUrl' : process.env.mongoUrl,
    'tokenKey' : process.env.tokenKey,
    "email": process.env.email,
    "password": process.env.password,

}