const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;


const workSchema = new Schema({
    workName: {
        type: String,
        required: true,
        min: 1,
        max: 80
    },
    workIntro: {
        type: String,
        required: false,
        max: 255
    },
    workFile: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = model("Work", workSchema);