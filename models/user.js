const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("User", userSchema);