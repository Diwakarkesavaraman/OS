const {email_response} = require('../modals/email-response');
const utils = require('../utils');
const config = process.env;

// nodemailer stuff
let transporter = utils.Smtp();

// testing success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready for messages");
        // console.log(success);
    }
})

module.exports = {

    email_response : async function (req,res)
    {
        console.log(req.body.email);

        if (req.body.email === "") {
            return res.status(400).json({
                status_code: 400,
                msg: "Please fill all required paramaters",
            });
        }

         // To Check if this user already exisits
         let user = await email_response.findOne({ email: req.body.email });
         if (user) {
             return res.status(400).json({
                 status_code: 400,
                 msg: "That user already exists!",
             });
 
         } else {
             // Insert the new user if they do not exist yet
             user = new email_response({
                 // username: req.body.username,
                 email: req.body.email,
                 // password: req.body.password
             });
 
             // user.password = await utils.hashpassword(user.password)
             user.save().then((result) => {
                 // handle account verification
                 console.log("saved_test");
 
                 var subject = "Verify Your Email";
                 var body = " Verify your Email address to complete the signup and login into your account.";
                 var api = "api/email/response";
                 console.log(result);
                 utils.sendVerificationEmail(result, transporter, subject, body, api);
 
             })
 
             // res.send(user);
             return res.status(200).json({
                 status_code: 0,
                 success_msg: "Please verify email id",
             });
         }
    }
}