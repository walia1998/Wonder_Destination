const Booking = require("../models/booking");
const Listing = require("../models/listing");

module.exports.createBooking = async (req, res) => {
    const { listingId, startDate, endDate } = req.body;
    const booking = new Booking({
        listing: listingId,
        user: req.user._id,
        startDate,
        endDate
    });
    await booking.save();
    req.flash("success", "Successfully booked the listing!");
    res.redirect(`/listings/${listingId}`);
};

module.exports.showAllBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).populate("listing");
    res.render("bookings/index", { bookings });
};

module.exports.showBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate("listing");
    if (!booking) {
        req.flash("error", "Booking not found");
        return res.redirect("/bookings");
    }
    res.render("bookings/show", { booking });
};

module.exports.updateBooking = async (req, res) => {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { startDate, endDate }, { new: true });
    req.flash("success", "Successfully updated the booking!");
    res.redirect(`/bookings/${booking._id}`);
};

module.exports.deleteBooking = async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    req.flash("success", "Successfully deleted the booking!");
    res.redirect("/bookings");
};
