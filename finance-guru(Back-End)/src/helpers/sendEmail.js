
require('dotenv').config();
const nodemailer = require("nodemailer"); 
const {google} = require('googleapis');



const oAuth2Client = new google.auth.OAuth2(
    

    process.env.CLIENT_ID, 
    process.env.CLIENT_SECRET, 
    process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});


  const sendEmail = async(emailSubject,clientEmail, emailText, emailHTML, ) => {
    
    try{
       const transport = nodemailer.createTransport({
           service: "gmail",
           auth: {
               type: "OAuth2",
               user: "fingru09@gmail.com", 
               clientId:  process.env.CLIENT_ID, 
               clientSecret: process.env.CLIENT_SECRET, 
               refreshToken: process.env.REFRESH_TOKEN,
               accessToken: await oAuth2Client.getAccessToken(), 

           }
       })
       await transport.sendMail({
        from: "Finance-Guru Support", 
        to:`${clientEmail}`, 
        subject: emailSubject, 
        text: emailText, 
        html: emailHTML, 
    
       }); 
    
    }
    catch(err){
      console.log(err);
        return;
    }
}


module.exports = {sendEmail}


