const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { sendEmail } = require("../helpers/sendEmail");


const retrieveUserData = (req, res) => {
    if (res.userData) {
        res.json({ Username: res.userData.Username });
    }
    else {
        res.status(401).end();
    }

}


const verifyPassword = async (req, res) => {
    console.log("Verify PAssword Called")
    if (res.userData) {
        if (await bcrypt.compare(req.body.password, res.userData.Password)) {
            res.status(200).end()
        }
        else {
            res.status(401).end();
        }
    }
    else {
        res.status(401).end();
    }
}

const updateUsername = async (req, res) => {
    if (res.userData) {
        try {
            res.userData.Username = req.body.updatedUsername
            await User.findByIdAndUpdate(res.userData.id, { Username: res.userData.Username }).exec();
            res.status(200).end();
        }
        catch (err) {
            console.log(err)
            res.status(400).end();
        }
    }
    else {
        res.status(401).end();
    }
}


const deleteAccount = async (req, res) => {
    if (res.userData) {
        try {
            //   await User.deleteOne({id:res.userData._id}); 
            await User.deleteOne({ _id: res.userData.id });
            res.status(200).end()
        }
        catch (err) {
            console.log(err)
            res.status(400).end();
        }
        console.log(res.userData.id);

    }
    else {
        res.status(401).end();
    }
}



//THESE SHOULD BE IN .ENV FILE: 

const sendPswdRstEmail = async (req, res) => {

    const email = req.body.email;
    try {
        let userData = await User.findOne({ Email: email })
        if (!userData) {
            console.log("Email not Found in DB")
            res.status(404).json({msg: "No User Exists with that email"});
        }

        const resetKey = process.env.JWT_KEY + userData.Password
        const payload = {
            email: userData.Email,
            id: userData.id
        }
        const token = jwt.sign(payload, resetKey, { expiresIn: "15m" });
        const link = `http://localhost:5000/auth/res-password/${userData.id}/${token}`;
        const emailText = `Hello Kokil \nPlease use this one-time link to reset your Finance-Guru Account Password: ${link}`
        const emailHTML = `<p>Hello Kokil</p><br><p>Please use this following <a href='${link}'>link<a/> to reset your Finance-Guru account password</p>`
        await sendEmail("User Account Request", email, emailText, emailHTML);
        res.status(200).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
}

const passwordReset = async (req, res) => {
    const { id, token } = req.params;
    let userData = await User.findOne({ Email: "kokilkounder@gmail.com" })
    if (id !== userData.id) {
        console.log("Invalid Id...")
        res.end();
    }
    const resetKey = process.env.JWT_KEY + userData.Password;
    try {
       jwt.verify(token, resetKey);
        console.log("Token is Valid")
        res.redirect(`http://localhost:3000/Reset-Password/${id}/${token}`)  //Dynamic .ENV Variable Required Here 
    }
    catch (err) {
        res.redirect(`http://localhost:3000/expired`)
    }
}


const retrieveUsername  = async(req, res) => {
    try{
        console.log(req.body);
        let userData = await User.findById(req.body.id)
        
        res.status(200).json({username: userData.Username}); 
    }
    catch(err){
        res.status(404).json({errmsg: "User does not exist"}); 
        
    }
  
}

const verifyToken = async(req, res) => {
   try{
    const { id, token } = req.body;
    let userData = await User.findById(id);
    const resetKey = process.env.JWT_KEY + userData.Password; 
    jwt.verify(token, resetKey);
    res.status(200).end();
   }
   catch(err){
       res.status(401).end();
   }
    
}


const changePassword = async (req, res) => {
    const {id, token, newPassword, newPasswordVerify } = req.body;

    try {
        let userData = await User.findById(id);
    const resetKey = process.env.JWT_KEY + userData.Password;
        jwt.verify(token, resetKey);
        const salt = await bcrypt.genSalt();
        encryptedPswd = await bcrypt.hash(newPassword, salt);
        await User.findByIdAndUpdate(userData.id, { Password: encryptedPswd });
        console.log("Password is Updated");
        res.status(200).end();
    }
    catch (err) {
        console.log(err);
        res.status(400).end()
    }
}




module.exports = {
    retrieveUserData,
    verifyPassword,
    updateUsername,
    deleteAccount,
    sendPswdRstEmail,
    passwordReset,
    changePassword, 
    retrieveUsername,
    verifyToken
}

