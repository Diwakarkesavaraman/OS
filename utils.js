const nodemailer = require('nodemailer');
const config = process.env;
const express = require('express');
const cloudinary = require("cloudinary").v2;


module.exports = {

   
    uploadImg: async function(req,res){
        // console.log(req.file);
        const file = req.file;
        var img_url;
        cloudinary.config({
            cloud_name: "dvaldxya4",
            api_key: "596668946624764",
            api_secret: "VW4xHk6B65FV79ThJsE42_dNt5w"
          });

          return new Promise((resolve,reject)=>{
            cloudinary.uploader.upload(__dirname+'/uploads/'+file.filename, (error,result )=>{
                // await unlinkAsync(__dirname+'/uploads/'+file.filename)
                resolve( result.url);
              })
            //  cloudinary.uploader.upload_stream(
            //     { folder: 'testing_angular_cloud' }, 
            //     (error, result) => {
                   
                 
            //         // console.log(result.url)
                 
                  
            //     if (error) {
            //       console.error(error);
                  
            //     }
            //     // res.json(result);
            //     resolve( result.url);
            // })
            // .end(req.file.buffer);
            // console.log('hello');
          })
         
        
       
    },

    Smtp: function () {
      const smtp = nodemailer.createTransport({
          // service: "gmail",
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: false,
          auth: {
              user: process.env.AUTH_EMAIL,
              pass: process.env.AUTH_PASS,
          }
      })

      return smtp;

  },

    sendVerificationEmail: function ({ _id, email }, transporter, subject, body, api) {
      const currentUrl = process.env.LOCAL_URI;
      // const uniqueString = uuidv4() + _id;


      const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: subject,
          html: `<p>${body}</p><p>This link <b> expires in 6 hours.</b></p>`
          // <p>Press <a href=${currentUrl + api + _id + "/" + uniqueString}>here </a> to proceed.</p>`,
      };

      transporter.sendMail(mailOptions);

      //hash the unique string

      // const saltRounds = 10;
      // bcrypt
      //     .hash(uniqueString, saltRounds)
      //     .then((hashedUniqueString) => {
      //         // set values in userverification collection
      //         const newVerification = new UserVerification({
      //             userId: _id,
      //             uniqueString: hashedUniqueString,
      //             created_at: Date.now(),
      //             expires_at: Date.now() + 21600000,
      //         });

      //         newVerification
      //             .save()
      //             .then(() => {
      //                 transporter.sendMail(mailOptions);
      //             })
      //     })

  },
}