const { slot_booking } = require('../modals/slot-booking');
const { slot_template } = require('../modals/slot-template');


module.exports = {

    create_update_slot : async function (req, res)
    {
        let slotbook = await slot_booking.findOne({created_on: req.body.created_on, ticket_type: req.body.ticket_type});

        if(slotbook){

            var object_id = slotbook._id.toString();

            let update_slot = await slot_booking.findOneAndUpdate(
                {
                    _id: object_id,
                },
                {
                    ticket_type: req.body.ticket_type,
                    slots: req.body.slots,
                    count: req.body.count
                },
                {
                    upsert: true,
                }
            )
            return res.json({ token: '200', msg: 'Slots Updated Successfully' });

        }
        else{

            slotbook = new slot_booking({
                created_on: req.body.created_on,
                ticket_type: req.body.ticket_type,
                slots: req.body.slots,
                count: req.body.count
            });
        

            const result = await slot_booking.create(slotbook);
            if(result)
            {
                return res.json({ token: '200', Slot: slotbook });
            }
            else
            {
                return false;
            }
        }
    },

    get_slot : async function(req,res){
        console.log(req.query)
        
        let slotbook = await slot_booking.findOne({ticket_type: req.query.ticket_type, created_on:req.query.created_on});
        console.log(slotbook)
        if(slotbook)
            {
                console.log(slotbook)
                return res.json({ token: '200', Slot: slotbook });
            } 
        else
            {
                if(req.query.name){
                    slotbook = await slot_template.findOne({name: req.query.name});
                    return res.json({ token: '201', Slot: slotbook });
                }
                return res.json({ token: '404', Error: 'No Booking Available' });
            }
    }


}