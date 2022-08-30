const express = require("express"); 
const router = express.Router();
const loginControllers = require("../controllers/loginControllers");


router.post("/verify", loginControllers.verifyLoginCred)

router.delete("/logout", loginControllers.logUserOut); 

module.exports = router; 
