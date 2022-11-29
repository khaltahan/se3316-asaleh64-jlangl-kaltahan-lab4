const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
    track_id:Number,
    album_id:String,
    album_title:String,
    artist_id:Number,
    artist_name:String,
    tags:Array,
    track_date_created:String,
    track_date_recorded:String,
    track_duration:String,
    track_genres:Array,
    track_number:String,
    track_title:String
})

module.exports = mongoose.model('Tracks',trackSchema);