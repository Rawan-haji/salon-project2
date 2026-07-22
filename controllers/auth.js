const User = require('../models/user')
const bcrypt = require('bcrypt')

const showsignUpForm=(req,res)=>{
    res.render('auth/sign-up.ejs')
}



const signUp=async(req,res)=>{
  try{
    const userInDatabase=await User.findOne({
        username:req.body.username
    })
if(userInDatabase){
    return res.render('error.ejs', { msg: 'Username already taken.' })
}
let userData={}
userData.username=req.body.username
const hashedPassword=bcrypt.hashSync(req.body.password,10)
userData.password=hashedPassword

const user = await User.create(userData)
req.session.user={
    username:user.username,
    _id: user._id
}
req.session.save(()=>{
 
    res.render('auth/sign-in.ejs')
})
} catch(error){
res.render('error.ejs', { msg: 'Something went wrong during sign up.'})
}}

const showSignInForm=(req,res)=>{
    res.render('auth/sign-in.ejs')
}

const signIn = async (req, res) => {
  try{
  const userInDatabase = await User.findOne({
    username: req.body.username,
  });

  if (!userInDatabase) {
    return res.render('error.ejs', { msg: 'User does not exist.' });
  }

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );

  if (!validPassword) {
    return res.render('error.ejs', { msg: 'Login failed, please try again.' });
  }


  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  };

  
  req.session.save(() => {
    if (req.session.selectedServices && req.session.selectedServices.length > 0) {
      return res.redirect('/bookings/new');
    }
    res.redirect('/dashboard');
  });
}catch(error){
res.render('error.ejs', { msg: 'Something went wrong during sign in.' })
}}


const signOut = async(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}
module.exports={
    showsignUpForm,
    signUp,
    showSignInForm,
    signIn,
signOut,

}