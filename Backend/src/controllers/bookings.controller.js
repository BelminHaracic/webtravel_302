const router = require('express').Router();
const bookingService = require('../services/bookings.service');

// Creates a new Booking
router.post('/bookings', async (req, res) => {
    let userID = req.body.userID;
    let destinationID = req.body.destinationID;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let username = req.body.username; // Dobijanje username iz zahtjeva

    let booking = await bookingService.create(userID, destinationID, startDate, endDate, username);

    res.json(booking);
});

// Retrieves bookings for a Specific User using UserID
router.get('/bookings/user', async (req, res) => {
    let userID = req.query.userID;
    let bookings = await bookingService.getByUserID(userID);
    res.json(bookings);
});


// Retrieves All Users
router.get('/bookings', async (req, res) => {

    let bookings = await bookingService.getAll();

    res.json(bookings);
});

// Updates a Specific User
router.put('/booking/', async (req, res) => {

    let id = req.query.id

    let userID = req.body.userID
    let destinationID = req.body.destinationID
    let startDate = req.body.startDate
    let endDate = req.body.endDate

    booking = bookingService.update(id, userID, destinationID, startDate, endDate)
    res.json(booking)
})

// Removes a Specific User using ID
router.delete('/booking/', async (req, res) => {

    let id = req.query.id;

    let booking = await bookingService.delete(id)
    if (booking == undefined) {
        res.json(null)
    } else {
        res.json(booking)
    }
})


module.exports.controller = router;