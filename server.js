const mongoose = require('mongoose') 
const express = require('express') 
require('dotenv').config() 
const methodOverride = require('method-override') 
const path = require('path') 
const app = express() 
const PORT = 3700 
const morgan = require("morgan")
const session = require('express-session')






const authCtrl =require('./controllers/auth')

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
app.use(passUserToView)

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


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})