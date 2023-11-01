const { user_booking } = require('../modals/user-booking');
const { slot_booking } = require('../modals/slot-booking');

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

    create_user_booking : async function (req,res){
        console.log(req.body);
        const parts = req.body.created_on.split('-');
        var created_on='';
       
        if(parts[0].length==4){
            console.log(parts[0])
            const year = parts[0];
            const month = parts[1];
            const day = parts[2];

            const parsedDate = new Date(year, month - 1, day); // Note: Months are zero-based (0-11)
             created_on = `${parsedDate.getDate()}-${parsedDate.getMonth() + 1}-${parsedDate.getFullYear()}`;

        }
        else{
             created_on = req.body.created_on
        }

        let slotbook = await slot_booking.findOne({created_on: created_on, ticket_type: req.body.ticket_type});
        console.log(slotbook)
        console.log(slotbook.slots.indexOf(req.body.slots));
        console.log(slotbook.slots);
        console.log(slotbook.count[slotbook.slots.indexOf(req.body.slots)]);

        slotCount = slotbook.count[slotbook.slots.indexOf(req.body.slots)]

        if(slotCount - req.body.count >=0){

            //Update the slot count
            let count_array = slotbook.count;
            count_array[slotbook.slots.indexOf(req.body.slots)] = slotCount - req.body.count

            var object_id = slotbook._id.toString();

            let update_slot = await slot_booking.findOneAndUpdate(
                {
                    _id: object_id,
                },
                {
                    count: count_array
                },
                
            )
            
            //Create new booking
            userbook = new user_booking({
                created_on: req.body.created_on,
                ticket_type: req.body.ticket_type,
                slots: req.body.slots,
                count: req.body.count,
                name: req.body.name,
                email: req.body.email
            });

            userbook.save().then((result) => {
                // handle account verification
                console.log("saved_test");

                var subject = "Booking Confirmation";
                var body = " Verify your Email address to complete the signup and login into your account."+JSON.stringify(req.body);
                var api = "api/email/response";
                console.log(result);
                utils.sendVerificationEmail(result, transporter, subject, body, api);

            })
        
            // const result = await user_booking.create(userbook);
            // if(result)
            // {
            //     return res.json({ token: '200', UserBook: result , Slot: update_slot});
            // }
            // else
            // {
            //     return false;
            // }
        }
        else{
            return res.json({ token: '404', Error: 'Seats not available' });
        }
    },

    get_user_booking : async function (req,res){
        console.log(req.query);
        let userBooking = await user_booking.find({ticket_type: req.query.ticket_type, created_on:req.query.created_on});
        // let slotbook = await user_booking.find({ticket_type: req.body.ticket_type, created_on:req.body.created_on});
        console.log(userBooking);
        if(userBooking)
        {
            return res.json({ token: '200', UserBook: userBooking});
        }
        else
        {
            return res.json({ token: '404', Error: 'No Booking Available' });
        }

    }
}

