const mongoose = require("mongoose");
const { schema } = require('../schemas/users.schema');
const user = mongoose.model("user", schema);
let currentShortId = 1;
// Create
async function create(fName, lName, Username, Password) {
    return await user.create({
        firstName: fName,
        lastName: lName,
        username: Username,
        password: Password
    });
}

// Get by ID
async function getByID(id) {
    return await user.findOne({ _id: id });
}

// Get All 
async function getAll() {

    let users = await user.find();
    return users;
}

// Update 
async function update(id, fName, lName, Username, Password) {
    return await user.findByIdAndUpdate(id, {
        firstName: fName,
        lastName: lName,
        username: Username,
        password: Password
    }, { new: true });
}
async function toggleActiveStatus(id, isActive) {
    return await user.findByIdAndUpdate(id, { active: isActive }, { new: true });
}

module.exports.toggleActiveStatus = toggleActiveStatus;

// Delete 
async function remove(id) {
    return await user.findByIdAndDelete(id);
}

async function loginUser(username, pass){
    if(username == undefined || pass == undefined){
        return;
    }
    return await user.findOne({username: username, password: pass});
}

module.exports.create = create;
module.exports.getByID = getByID;
module.exports.getAll = getAll;
module.exports.update = update;
module.exports.delete = remove;
module.exports.loginUser = loginUser;