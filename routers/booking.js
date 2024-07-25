const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapasync.js")
router.post("/", isLoggedIn, wrapAsync(bookingController.createBooking));

router.get("/", isLoggedIn, wrapAsync(bookingController.showAllBookings));

router.get("/:id", isLoggedIn, wrapAsync(bookingController.showBooking));

router.put("/:id", isLoggedIn, wrapAsync(bookingController.updateBooking));

router.delete("/:id", isLoggedIn, wrapAsync(bookingController.deleteBooking));

module.exports = router;
