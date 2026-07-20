const Booking = require('../models/bookings');

// show all bookings
const index = async (req, res) => {
  const allBookings = await Booking.find({ user: req.session.user._id });
  res.render('salon/index.ejs', { allBookings });
};

// Show the form
const showBookingForm = (req, res) => {
  res.render('salon/submit-booking.ejs', { booking: null });
};

//Create booking
const createBooking = async (req, res) => {
  const selectedServices = [].concat(req.body.services || []);
  const bookData = {
    home: req.body.home,
    road: req.body.road,
    street: req.body.street,
    date: req.body.date,
    time: req.body.time,
    recommendation: req.body.recommendation,
    services: selectedServices,
    user: req.session.user._id,
  };

  await Booking.create(bookData);
  res.redirect('/bookings');
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
  await Booking.findByIdAndDelete(req.params.bookingId);
  res.redirect('/bookings');
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

