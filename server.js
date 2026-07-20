const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"])

const mongoose = require('mongoose') 
const express = require('express') 
require('dotenv').config() 
const methodOverride = require('method-override') 
const path = require('path') 
const app = express() 

const morgan = require("morgan")
const session = require('express-session')
const { MongoStore } = require('connect-mongo')




const authCtrl =require('./controllers/auth')
const serCtrl=require('./controllers/services')
const bookCtrl=require('./controllers/booking')



const port = process.env.PORT ? process.env.PORT : 3000 

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


app.use(morgan('dev'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}))
// app.use(passUserToView)

//to home page
app.get('/',(req,res)=>{
res.render('home.ejs',{
      user:req.session.user,
   })
 })

 

app.get('/auth/sign-up',authCtrl.showsignUpForm)
app.post('/auth/sign-up',authCtrl.signUp)
app.get('/auth/sign-in', authCtrl.showSignInForm)
app.post('/auth/sign-in', authCtrl.signIn)
app.delete('/auth/sign-out',authCtrl.signOut)


app.get('/services', serCtrl.serve)
app.post('/services',serCtrl.chooseService)

app.get('/services/details/:serviceName', serCtrl.showDetails)

app.post('/submit-booking',bookCtrl.createBooking)
app.delete('/booking/:bookingId',bookCtrl.deleteServes)


// app.get('/services/haircut', serCtrl.haircutDetails)
// app.get('/services/manicure', serCtrl.manicureDetails)
// app.get('/services/makeup', serCtrl.makeupDetails)
// app.get('/services/hairstyling', serCtrl.hairstylingDetails)



app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})