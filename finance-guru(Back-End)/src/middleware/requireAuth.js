const jwt = require("jsonwebtoken");
const User = require("../models/users");
const createToken = require("../helpers/createToken")
require('dotenv').config();

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //Check if Web Token Exists and is Valid 
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
            if (err) {
                res.userData = false;
                next()
            }
            else {
                try{
                    /*Checks if the Token matches a user, then retrieves appropriate resources, sends them,
                    and refreshes token*/
                    res.userData  = (await User.findById(decodedToken.id));
                    res.cookie("jwt", createToken(decodedToken.id), {httpOnly: true, maxAge: 30 * 60 * 1000});
                    next()
                }
                catch(err){
                   console.log(err);
                    res.userData = false; 
                    next();
                }
               
            }
        })
    }
    else {
        res.userData = false; 
        next()
    }
}



module.exports = { requireAuth };