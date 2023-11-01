const express = require('express');
const imgupload = require('./Routes/imgupload.js');
const slotbook = require('./Routes/slotbook.js');
const userbook = require('./Routes/userbook.js')
const slottemplate = require('./Routes/slottemplate.js');
const emailresponse = require('./Routes/emailresponse.js');
const router = express.Router();


router.route('/imgupload').post(imgupload.img_upload);
router.route('/updateImage').post(imgupload.update_image);
router.route('/getImage').get(imgupload.get_image);

//Slot
router.route('/slotbook').post(slotbook.create_update_slot);
router.route('/getslot').get(slotbook.get_slot);

//Slot template
router.route('/slottemplate').post(slottemplate.create_slot_template);
router.route('/getSlotTemplate').get(slottemplate.get_slot_template);
router.route('/updateSlotByDateRange').post(slottemplate.update_Slot_By_DateRange);


//Email
router.route('/emailResponse').post(emailresponse.email_response);


//User
router.route('/userbook').post(userbook.create_user_booking);
router.route('/getbooking').get(userbook.get_user_booking);

//Marquee
router.route('/marquee').post(imgupload.post_marquee);
router.route('/get/marquee').get(imgupload.get_marquee);


module.exports = router;