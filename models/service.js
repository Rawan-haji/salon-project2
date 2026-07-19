const mongoose = require('mongoose')

const ServicesSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
},

price:{
    type:Number,
    required:true,
    min=0,
},
Description:{
type:String,
required:true,
},
Duration:{
    type:String,
    required:true,
}
})
