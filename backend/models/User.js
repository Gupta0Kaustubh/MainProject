const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    gender: String,
    dob: Date,
    city: String,
    state: String,
    subscribeNewsletter: Boolean,
    passwords: String
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
