const { Image_upload } = require('../modals/image-upload');
const config = process.env;
const express = require('express');
const cloudinary = require("cloudinary").v2;
const utils = require('../utils');
const {marquee_response} = require('../modals/marquee');
// const multer = require('multer');
// env variables
require("dotenv").config();

var img_url;



module.exports = {


    img_upload: async function (req, res) {
       
       
        let img_url = await utils.uploadImg(req);
        // const url = this.uploadImg(request)
        // var r = req.result;
        console.log('123')
        console.log(img_url);
        const data = JSON.parse(req.body.data);
        console.log(data)
        
          
       let headings = await Image_upload.findOne({ img_url: img_url });

        if (headings) {
            return res.json({ token: '409', msg: 'The img category already exists!' });
        }
        else {
            // Insert the question if they do not exist yet
            headings = new Image_upload({
                heading:data.img_headings,
                description: data.img_description,
                img_url: img_url,
                publish_date: data.publish_date

            });
        

            const result = await Image_upload.create(headings);
            if(result)
            {
                return res.json({ token: '200', article: headings });
            }
            else
            {
                return false;
            }
    

        }
    },

    get_image: async function(req,res){
        let data = await Image_upload.find();
        if(data)
            {
                return res.json({ token: '200', article: data });
            }
            else
            {
                return false;
            }
    },

    update_image: async function(req,res){
      
        const data = JSON.parse(req.body.data);
        console.log(data._id)
        console.log(data)
        
        let headings = await Image_upload.findById(data._id);
        

        if (headings) {

            if(req.file){
                 let img_url = await utils.uploadImg(req);
                 headings = {
                    heading:data.img_headings,
                    description: data.img_description,
                    img_url: img_url,
                    publish_date: data.publish_date
                };
            }else{
                headings = {
                    heading:data.img_headings,
                    description: data.img_description,
                    publish_date: data.publish_date
                };
            }
           
            const result = await Image_upload.updateOne({_id:data._id},headings);
            console.log(1112)
            console.log(result)
            if(result)
            {
                return res.json({ token: '200', article: headings });
            }
            else
            {
                return false;
            }
        }
        else {
            return res.json({ token: '409', msg: 'The img category already exists!' });
        }

        // let img_url = await utils.uploadImg(req);
        // // const url = this.uploadImg(request)
        // // var r = req.result;
        // console.log('123')
        // console.log(img_url);
        // const data = JSON.parse(req.body.data);
        // console.log(data)
    
          
      
    },

    post_marquee: async function(req, res){

 

        let marquee_text = req.body.marquee_text;

        let marquee_text_unique = await marquee_response.findOne({});

        console.log(req.body.marquee_text);
        console.log(marquee_text_unique);

 

        if(marquee_text_unique){

            let marquee_unique_id = marquee_text_unique._id.valueOf();

            let marquee_update = await marquee_response.findOneAndUpdate(

                {

                    _id: marquee_unique_id,

                },

                {

                    marquee_text: req.body.marquee_text

                },

                {

                    upsert: true,

                }

            )

            return res.json({ token: '200', msg: 'Marquee Updated Successfully' });

        }

        else{

            marquee_text = new marquee_response({

                marquee_text: req.body.marquee_text

            });

 

            const result = await marquee_response.create(marquee_text);

 

            if(result)

            {

                return res.json({ token: '200', marquee: marquee_text });

            }

            else

            {

                return false;

            }

        }

 

    },

    get_marquee: async function(req, res){

        let marquee_text = await marquee_response.find();

        let data = marquee_text[0]['marquee_text'];

 

        if(data)

            {

                return res.json({ token: '200', marquee_text: data });

            }

            else

            {

                return false;

            }

    }


}