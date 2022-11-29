const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    artist_id:{
        type:Number,
    },
    artist_image_file:{
        type:String,
    },
    artist_name:{
        type:String,
    },
    artist_location:{
        type:String,
    },
    artist_active_year_begin:{
        type:String,
    },
    artist_members:{
        type:String,
    },
    artist_website:{
        type:String,
    }
    

})

module.exports = mongoose.model('Artists',artistSchema)