const mongoose = require("mongoose");
const { schema } = require('../schemas/destinations.schema');
const dest = mongoose.model("destination", schema);


// Create 
async function create(city, country, description, imageURL, review, continent, categories) {
    try {
        const newDestination = await dest.create({
            city,
            country,
            description,
            imageURL,
            review,
            continent, 
            categories
        });
        return newDestination;
    } catch (error) {
        throw new Error(`Failed to create destination: ${error.message}`);
    }
}

// Get All 
async function getAll() {

    let destinations = await dest.find();
    return destinations;
}

// Get by ID 
async function getByID(id) {

    let destinations = await dest.findById(id);
    return destinations;
}

// Update 
async function update(id, City, Country, Description, ImgURL, Review, Category, Continent) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }

    return await dest.findByIdAndUpdate(id, {
        city: City,
        country: Country,
        description: Description,
        imageURL: (ImgURL !== "" ? ImgURL : destination.ImgURL),
        review: Review,
        categories: Category,
        continent: Continent
    }, {
        new: true
    });
}
// Delete 
async function remove(id) {

    if (mongoose.isValidObjectId(id)) {
        return await dest.findByIdAndDelete(id);
    }

    return null;
}
async function addComment(destinationId, userId, message) {
    return await dest.findByIdAndUpdate(destinationId, {
        $push: { comments: { user: userId, message: message } }
    }, { new: true });
}
async function getAllWithComments() {
    return await dest.find().populate('comments.user', 'username');
}
async function updateWithComment(destinationId, commentId, message) {
    return await dest.findOneAndUpdate(
        { _id: destinationId, 'comments._id': commentId },
        { $set: { 'comments.$.message': message } },
        { new: true }
    );
}
async function getDestinationWithComments(id) {
    return await Destination.findById(id).populate('comments.user', 'username');
}

async function deleteComment(destinationId, commentId) {
    return await Destination.findByIdAndUpdate(destinationId, {
        $pull: { comments: { _id: commentId } }
    }, { new: true });
}
module.exports.create = create;
module.exports.getAll = getAll;
module.exports.getByID = getByID;
module.exports.update = update;
module.exports.delete = remove;
module.exports.addComment = addComment;
module.exports.getAllWithComments = getAllWithComments;
module.exports.updateWithComment = updateWithComment;
module.exports.getDestinationWithComments = getDestinationWithComments;
module.exports.deleteComment = deleteComment;