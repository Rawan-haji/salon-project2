const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"])

const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
app.set('view engine', 'ejs');

const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require('express-session')
const { MongoStore } = require('connect-mongo')
const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view')



const authCtrl =require('./controllers/auth')
const serCtrl=require('./controllers/services')
const bookingCtrl = require('./controllers/booking');
const questionsCtrl = require('./controllers/questions')


const port = process.env.PORT ? process.env.PORT : 3000 
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan('dev'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}))
app.use(passUserToView)


mongoose.connect(process.env.MONGODB_URI) 
mongoose.connection.on('connected', () => { 
  console.log(`connected to the Database 
${mongoose.connection.name}`) 
}) 

app.use(express.urlencoded({ extended: false })) 

app.use(methodOverride('_method'))

app.get('/services', serCtrl.serve)


app.get('/dashboard',isSignedIn,async(req,res)=>{
  res.render('dashboard.ejs',{
    user: req.session.user,
  })
})


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
app.get('/services/:serviceName', serCtrl.showDetails);
app.get('/bookings', isSignedIn, bookingCtrl.index)
app.get('/bookings/new', isSignedIn, bookingCtrl.showBookingForm)


app.post('/bookings', isSignedIn, bookingCtrl.createBooking)
app.get('/bookings/:bookingId/edit', bookingCtrl.editBooking)
app.put('/bookings/:bookingId', isSignedIn, bookingCtrl.update)
app.delete('/bookings/:bookingId', bookingCtrl.deleteBooking)

app.get('/bookings/:bookingId', isSignedIn, bookingCtrl.showBooking)
app.post('/bookings/:bookingId/questions',isSignedIn, questionsCtrl.create)
app.post('/bookings/:bookingId/favorited-by/:userId', isSignedIn, bookingCtrl.favorite)
app.delete('/bookings/:bookingId/favorited-by/:userId',isSignedIn, bookingCtrl.unfavorite)


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})