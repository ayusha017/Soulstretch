const mongoose = require("mongoose");

const YogaSchema = new mongoose.Schema({
    condition: String,
    title: String,
    description: String,
    imageUrl: String,
    pageUrl: String
});

module.exports = mongoose.model("Yoga", YogaSchema);
