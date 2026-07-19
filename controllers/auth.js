const User = require('../models/user')
const bcrypt = require('bcrypt')

const showsignUpForm=(req,res)=>{
    res.render('auth/sign-up.ejs')
}
const signUp=async(req,res)=>{
    const userInDatabase=await User.findOne({
        username:req.body.username
    })
if(userInDatabase){
    return res.send('Username already taken')
}
let userData={}
userData.username=req.body.username
const hashedPassword=bcrypt.hashSync(req.body.password,10)
userData.password.hashedPassword

const user = await User.create(userData)
req.session.user={
    username:user.username,
    _id: user._id
}
req.session.save(()=>{
    res.redirect('/')
})
}

module.exports={
    showsignUpForm,
    signUp,


}