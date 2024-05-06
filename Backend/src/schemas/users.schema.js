const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortid = require('shortid');

let schema = Schema({
    _id: { type: String, default: shortid.generate }, 
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    active: { type: Boolean, default: true }
});

module.exports.schema = schema;
