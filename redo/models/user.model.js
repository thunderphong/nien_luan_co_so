const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true,
        min: 6,
        max: 25
    },
    password: {
        type: String,
        required: true,
        min: 7,
        max: 1024
    },
    email: {
        type: String,
        min: 6,
        max: 50
    },
    name: {
        type: String,
        max: 50
    },
    fname: {
        type: String,
        max: 50
    },
    tel: {
        type: String,
        max: 11
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema, 'user');