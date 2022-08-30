const express = require("express"); 
const router = express.Router();
const {registerToDB} = require("../controllers/registrationControllers");

router.post("/submit", registerToDB);

module.exports = router; 