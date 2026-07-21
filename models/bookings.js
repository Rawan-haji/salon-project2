const mongoose=require('mongoose')
const bookingSchema=new mongoose.Schema({
    home:{
    type:String,
    required:true
    },
    road:{
        type:String,
        required:true

    },
    street:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },  
    time:{
        type:String,
        required:true
    },
    // recommendation:{
    //     type:String,
    //     required:true
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
    // timestamps:true

})
module.exports=mongoose.model('Booking',bookingSchema)