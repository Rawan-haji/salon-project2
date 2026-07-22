const mongoose = require('mongoose')

const ServicesSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
},
serviceName:{
    type:String,
},
price:{
    type:Number,
    required:true,
    
},
description:{
type:String,
required:true,
},
duration:{
    type:String,
    required:true,
},


})
const Service= mongoose.model('Service',ServicesSchema)
module.exports= Service
