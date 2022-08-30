const User = require("../models/users.js");
const createToken = require("../helpers/createToken");



const registerToDB = async function (req, res) {
    const { Email, Username, Password } = req.body;

    try {
        const user = await User.create({Email, Username, Password});
        await user.save(); 
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: 3 * 60 * 60 * 1000});
        res.status(201);
        res.end();
    }
    catch(err) {
        console.log(err.keyValue);
        res.status(400).send(`${Object.keys(err.keyValue)[0]} Duplicate`);
    }

}


module.exports = { registerToDB };