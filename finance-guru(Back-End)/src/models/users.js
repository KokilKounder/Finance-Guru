const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
const bcrypt = require("bcrypt");


const userSchema = new Schema({
    Email: {type: String, required:true, unique: true, lowercase:true}, 
    Username:{type: String, required: true, unique: true},
    Password: {type: String, required: true, unique: false, minlength:8}, 
    Expenses: {type: Object, required: true, unique: false, default: () => {
        return {};
    }}
});

//Mongoose Hook Function to Hash Passwords before they are added to the Database

userSchema.pre("save", async function(next){
   if(this.isModified("Password")){
    const salt = await bcrypt.genSalt();
    this.Password = await bcrypt.hash(this.Password, salt); 
   }
    next(); 
})


//Static Method to Login User 
userSchema.statics.login = async function(Username, Password){
    const user = await this.findOne({Username});
    if(user && await bcrypt.compare(Password, user.Password)){
        return user; 
    }
    throw Error("Incorrect Username/Password Combo")
    
}
module.exports = mongoose.model("User", userSchema); 