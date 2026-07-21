const Booking = require('../models/bookings');

// show all bookings
const index = async (req, res) => {
  const allBookings = await Booking.find({ user: req.session.user._id });
  res.render('salon/index.ejs', { allBookings });
};

// Show the form
const showBookingForm = async (req, res) => {
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
      recommendation: body.recommendation,
      services: [].concat(body.services || []),
      user: req.session.user._id,
    };

    await Booking.create(bookingData);
    res.redirect('/bookings');
  } catch (error) {
    console.error('Validation Error Details:', error.errors);
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
  bookingData.home = req.body.home;
  bookingData.road = req.body.road;
  bookingData.street = req.body.street;
  bookingData.date = req.body.date;
  bookingData.time = req.body.time;
  bookingData.recommendation = req.body.recommendation;
  bookingData.services = [].concat(req.body.services || []);
  await Booking.findByIdAndUpdate(req.params.bookingId, bookingData);
  res.redirect(`/bookings/${req.params.bookingId}`);
};

// delete the booking
const deleteBooking = async (req, res) => {
try {
   
    await Booking.findByIdAndDelete(req.params.bookingId || req.params.id);
    
    res.redirect('/bookings');
  } catch (error) {
    console.error(error);
    res.redirect('/bookings');
  }
};










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
};

