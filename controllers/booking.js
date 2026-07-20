const Booking=require('../models/bookings')



const update = async(req,res)=>{
    let bookingData={}

    bookingData.home = req.body.home
    bookingData.road = req.body.road
    bookingData.street = req.body.street
    bookingData.date = req.body.date
    bookingData.time= req.body.time
    bookingData.recommendation=req.body.recommendation
    bookingData=[].concat(req.body.services || [])

    await Booking.findByIdAndUpdate(req.params.bookindId, bookData)
    res.redirect(`/bookings/${req.params.bookindId}`)
}

const deleteBooking = async (req, res)=>{
    await Booking.findByIdAndDelete(req.params.bookindId)
    res.redirect('/bookings')
}


// all the bokkings 
const index = async (req, res) => {
  const allBookings = await Booking.find({ user: req.session.user._id });
  res.render('salon/index.ejs', { allBookings });
};

//from crete new booking

const showBookingForm=(req, res)=>{
    res.render('salon/submit-booking.ejs',{
        booking:null
    })
}


//crete new booking
const createBooking = async(req,res)=>{
    if(!req.file){
        return res.render('error.ejs',{
            msg:'please select '
        })
    }
    //handle checkboxes
    const selectServices = [].concat(req.body.services||[])

    const bookData ={
        home: req.body.home,
    road: req.body.road,
    street: req.body.street,
    date: req.body.date,
    time: req.body.time,
    recommendation: req.body.recommendation,
    services: selectedServices,
    user: req.session.user._id,
    }
    await Booking.create(bookData)
    res.redirect('/bookings')
}

const editeBooking = async(req, res)=>{
   const foundBooking = await Booking.findById(req.params.bookindId)
   
   res.render('salon/edit-bookig.ejs',{
    foundBooking
   })
}
//favorite booking
const favorite = async (req, res)=>{
    await Booking.findByIdAndUpdate(req.params.bookindId,{
        $push:{favoritedByUsers:req.params.userId}
    })
    res.redirect(`/bookings/${req.params.bookindId}`)
}

//unfavorite booking

const unfavorite = async (req, res)=>{
    await Booking.findByIdAndUpdate(req.params.bookindId,{
        $pull: {favoritedByUsers:req.params.userId}
    })
    res.redirect(`/bookings/${req.params.bookindId}`)
}

module.exports={
    update,
    deleteBooking,
    favorite,
    unfavorite,
    editeBooking, 
    index,
    showBookingForm,
    selectServices, 
    createBooking,
    showBookingForm
}


