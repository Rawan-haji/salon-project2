const Booking = require ('../models/bookings')

const create = async (req, res)=>{
    const foundBooking = await Booking.findById(req.params.bookingId)

    const qustionData = {}
    qustionData.text =req.body.text
    qustionData.user = req.session.user._id

    foundBooking.questions.push(qustionData)
    await foundBooking.save()

    res.redirect(`/bookings/${req.params.bookingId}`)
}

module.exports={
    create,
}