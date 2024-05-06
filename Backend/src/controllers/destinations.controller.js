const router = require('express').Router();
const destService = require('../services/destinations.service')


// Creates a new Destination
router.post('/destinations', async (req, res) => {
    const { city, country, description, imageURL, review, continent, categories } = req.body;

    // Ensure continent is stored as a string
    const continentString = Array.isArray(continent) ? continent.join(', ') : continent;

    try {
        const createdDestination = await destService.create(city, country, description, imageURL, review, continentString, categories);
        res.json(createdDestination);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create destination', error });
    }
});


// Retrieves a Specific Destination using ID
router.get('/destination', async (req, res) => {

    let id = req.query.id;

    let destination = await destService.getByID(id);
    res.json(destination);
});

// Retrieves All Destinations
router.get('/destinations', async (req, res) => {

    let destinations = await destService.getAll();

    res.json(destinations);
});

// Edit Destination
router.put("/destination/", async (req, res) => {

    let id = req.query.id

    let city = req.body.city
    let country = req.body.country
    let description = req.body.description
    let imageURL = req.body.imageURL
    let review = req.body.review
    let continent = req.body.continent
    let categories = req.body.categories

    destination = destService.update(id, city, country, description, imageURL, review, continent, categories);
    res.json(destination);
});

router.post('/destination/comment', async (req, res) => {
    const { destinationId, userId, message } = req.body;
    try {
        const updatedDestination = await destService.addComment(destinationId, userId, message);
        res.json(updatedDestination);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add comment', error });
    }
});

// Removes a Specific Destination using ID
router.delete('/destination/', async (req, res) => {

    let id = req.query.id;
    console.log(id)

    let destination = await destService.delete(id);
    if (destination == undefined) {
        res.json(null);
    } else {
        res.json(destination);
    }


})

module.exports.controller = router;