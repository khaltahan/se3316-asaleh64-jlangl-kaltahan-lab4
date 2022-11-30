const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    genre_id:{
        type: Number,
    },
    parent:{
        type: Number,
    }

})

module.exports = mongoose.model('Genres',genreSchema)