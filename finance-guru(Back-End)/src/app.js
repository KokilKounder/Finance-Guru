const express = require("express");
const mongoose = require("mongoose")
require('dotenv').config();
const app = express();
const port = 5000;
const registerRoutes = require("./routes/registerRoutes");
const cookieParser = require("cookie-parser"); 
const loginRoutes = require("./routes/loginRoutes");
const authRoutes = require("./routes/authRoutes");
const exprenseRoutes = require("./routes/expenseRoutes");


//Connect to Database 
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}
@database1.w3qt4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(() => {
  console.log("Connected Successfully")  
}).catch((err)=> {
    throw new Error(err);
})

//Start Server 
app.listen(port, () => {
    console.log(`App Listening on Port ${port} \n`); 
}) 

//Parses JSON request data  
app.use(express.json()); 
//Allows easier use of Cookies
app.use(cookieParser());


app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/auth", authRoutes);
app.use("/expenses", exprenseRoutes);

