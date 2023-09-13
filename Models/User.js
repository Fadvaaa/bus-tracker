const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['super_admin'] }
}, {
    versionKey: false,
});


module.exports = mongoose.model('users', Schema);