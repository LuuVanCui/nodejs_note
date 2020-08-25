const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String,
    },
    username: {type: String, required: true},
    password: {type: String, required: true},
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);