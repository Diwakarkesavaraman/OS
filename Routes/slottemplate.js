const { slot_template } = require('../modals/slot-template');
const { slot_booking } = require('../modals/slot-booking');


module.exports = {

    //create and update slot template
    create_slot_template : async function (req, res)
    {
        console.log(req.body);
        let slottemplate = await slot_template.findOne({name: req.body.name});
        if(slottemplate){

            var object_id = slottemplate._id.toString();

            let update_slot = await slot_template.findOneAndUpdate(
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

            slotbook = new slot_template({
                name: req.body.name,
                ticket_type: req.body.ticket_type,
                slots: req.body.slots,
                count: req.body.count
            });
        

            const result = await slot_template.create(slotbook);
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

    get_all_slot_template : async function(req,res){
        
        let slotbook = await slot_template.find();
        console.log(slotbook)
        if(slotbook)
            {
                return res.json({ token: '200', Slot: slotbook });
            }
            else
            {
                return res.json({ token: '404', Error: 'No Template Available' });
            }
    },

    get_slot_template : async function(req,res){
        let slotbook = ''
        // slotbook = await slot_template.find();
        // console.log(req.query.name)
        if(req.query.name){
             slotbook = await slot_template.find({name: req.query.name});
        }else{
             slotbook = await slot_template.find();
        }
        
        // let slotbook = await slot_template.find({name: req.query.name});
        console.log(slotbook)
        if(slotbook)
            {
                return res.json({ token: '200', Slot: slotbook });
            }
            else
            {
                return res.json({ token: '404', Error: 'No Template Available' });
            }
    },

    update_Slot_By_DateRange : async function(req,res){
       

        var res_count=0;
         const start = new Date(req.body.from_date); 
        const end = new Date(req.body.to_date); 
        console.log(start)
        console.log(end)

        const date = new Date(start.getTime());

        const dates = [];

  while (date <= end) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  console.log(dates)
  let template = ''     
        if(req.body.name){
            template = await slot_template.find({name: req.body.name});
        }else{
            template = await slot_template.find();
        }

        console.log(template);
        

        for(let i=0;i<dates.length;i++){
           
            var day= dates[i].getDate().toString().padStart(2, '0');
            var month= (dates[i].getMonth()+1).toString().padStart(2, '0');
            var year= dates[i].getFullYear().toString();
            slotDate=day+'-'+month+'-'+year;

            slotbook = new slot_booking({
                created_on: slotDate,
                ticket_type: req.body.ticket_type,
                slots: template[0].slots,
                count: template[0].count
            });
        

            const result = await slot_booking.create(slotbook);
            if(result)
            {
                res_count=res_count+1;
            }
            
            console.log(slotDate);
        }
        if(res_count==dates.length){
            return res.json({ token: '200' });
        }else{
            return res.json({token:'404'})
        }


    },
     getDaysArray : function(start, end) {
        for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        return arr;
    }

}