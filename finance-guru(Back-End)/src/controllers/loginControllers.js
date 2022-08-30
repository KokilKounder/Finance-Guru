const User = require("../models/users")
const createToken = require("../helpers/createToken");

const verifyLoginCred = async (req, res) => {
    const {Username, Password} = req.body; 
    try{
        const user = await User.login(Username, Password)
        res.status(200)
        res.cookie("jwt", createToken(user._id), {httpOnly: true, maxAge: 3 * 60 * 60 * 1000});
        res.end();
    }
    catch(err){
        res.status(401).json({errmsg: "Incorrect Login"}).end();
    }
}

const logUserOut = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1});
    res.json({status: "You are Now logged Out"});
}

module.exports = {verifyLoginCred, logUserOut}