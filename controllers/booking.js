const bookings = require('../models/bookings');
const Booking = require('../models/bookings');

// show all bookings
const index = async (req, res) => {
  const allBookings = await Booking.find({ user: req.session.user._id });
  res.render('salon/index.ejs', { allBookings });
};

// Show the form
const showBookingForm = async (req, res) => {
let selectedServices = req.query.services
  if (!selectedServices || selectedServices.length === 0) {
    return res.render('error.ejs', { 
      msg: 'Please select at least one service before proceeding to booking.' 
    });
  }
  res.render('salon/submit-booking.ejs', { 
    services: [] 
  });
};



//Create booking
const createBooking = async (req, res) => {
  try {
    const body = req.body || {};

    const bookingData = {
      home: body.home,
      road: body.road,
      street: body.street,
      date: body.date,
      time: body.time,
       services:body.services,
      user: req.session.user._id,
    };

    await Booking.create(bookingData);
    res.redirect('/bookings');
  } catch (error) {
    console.log('Validation Error Details:', error.errors);
    res.render('error.ejs', { msg: 'Please fill out all required form fields.' });
  }
};


// editing form
const editBooking = async (req, res) => {
  const foundBooking = await Booking.findById(req.params.bookingId);
  res.render('salon/edit-booking.ejs', { foundBooking });
};

// updating the booking
const update = async (req, res) => {
  let bookingData = {};
  bookingData.home = req.body.home
  bookingData.road = req.body.road
  bookingData.street = req.body.street
  bookingData.date = req.body.date
  bookingData.time = req.body.time
  bookingData.services = req.body.services
  await Booking.findByIdAndUpdate(req.params.bookingId, bookingData);
  res.redirect(`/bookings/${req.params.bookingId}`)
};

// delete the booking
const deleteBooking = async (req, res) => {
try {
 await Booking.findByIdAndDelete(req.params.bookingId)
 res.redirect('/bookings')  
}catch(error){
  console.log(error)
  res.render('error.ejs', {msg:'Unable to delete'})
}
}

const showBooking=async(req,res)=>{
  const foundBooking = await Booking.findById(req.params.bookingId).populate('user')
  console.log(foundBooking,"foundbooking=======");
  
  const userHasFavorited = foundBooking.favoritedByUsers.some((user) => {
    return user.equals(req.session.user._id)
  })
  res.render('salon/show.ejs',{
    foundBooking,
    userHasFavorited,
  })
}










// Favorite
const favorite = async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.bookingId, {
    $push: { favoritedByUsers: req.params.userId },
  });
  res.redirect(`/bookings/${req.params.bookingId}`);
};

// Unfavorite
const unfavorite = async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.bookingId, {
    $pull: { favoritedByUsers: req.params.userId },
  });
  res.redirect(`/bookings/${req.params.bookingId}`);
};

module.exports = {
  index,
  showBookingForm,
  createBooking,
  editBooking,
  update,
  deleteBooking,
  favorite,
  unfavorite,
  showBooking,
};

