const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    city: String,
    country: String,
    description: String,
    imageURL: String,
    review: String,
    continent: String,
    categories: [String],
    comments: [{ user: String, message: String, date: { type: Date, default: Date.now } }]
});
const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
