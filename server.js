const mongoose = require('mongoose') 
const express = require('express') 
require('dotenv').config() 
const methodOverride = require('method-override') 
const path = require('path') 
const app = express() 
const PORT = 3700 


// Mongoose connection 
mongoose.connect(process.env.MONGODB_URI) 
mongoose.connection.on('connected', () => { 
  console.log(`connected to the Database 
${mongoose.connection.name}`) 
}) 

app.use(express.urlencoded({ extended: false })) 

app.use(methodOverride('_method'))


// new code below this line (this is for css) 
app.use(express.static(path.join(__dirname, 'public'))) 

app.listen(PORT, () => { 
  console.log(`Server is listening on 
port ${PORT}`) 
}) 