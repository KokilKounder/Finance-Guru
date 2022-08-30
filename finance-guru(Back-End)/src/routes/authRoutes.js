const { application } = require("express");
const express = require("express"); 
const router = express.Router();
const {retrieveUserData, verifyPassword, updateUsername, deleteAccount, sendPswdRstEmail, passwordReset, changePassword, retrieveUsername, verifyToken } = require("../controllers/authControllers")
const {requireAuth} = require("../middleware/requireAuth");


router.get("/getUserData", requireAuth, retrieveUserData);

router.post("/verifyPassword", requireAuth, verifyPassword);

router.put("/updateUsername", requireAuth, updateUsername); 

router.delete("/deleteAccount", requireAuth, deleteAccount);

router.post("/forgotPassword", sendPswdRstEmail);  

router.get("/res-password/:id/:token", passwordReset);

router.post("/verifyToken", verifyToken); 

router.post("/get-username", retrieveUsername)

router.post("/reset-password", changePassword);


module.exports = router; 