const mongoose=require('mongoose')

const questionSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    user:{
     type:mongoose.Schema.Types.ObjectId,
     ref: 'User',
        required: true,
  
    }
})



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
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questions: [questionSchema],
    services: [String],
    favoritedByUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

},{ timestamps: true } )

module.exports=mongoose.model('Booking',bookingSchema)