const jwt = require("jsonwebtoken"); 
require('dotenv').config();

function createToken(id){
    return jwt.sign({id}, process.env.JWT_KEY, {
        expiresIn: 30*60, 
    })
}

module.exports = createToken;