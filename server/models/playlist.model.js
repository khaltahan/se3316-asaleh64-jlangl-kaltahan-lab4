const mongoose = require('mongoose');
// import user and review models 

// playlist schema 
const playlistSchema = new mongoose.Schema({
    created_by:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    playlist_name:{
        type:String,
        required:true,
    },
    tracks:[{
        type:String
    }], 
    last_change:{
        type:Date
    },
    review:{
        type: Schema.Types.ObjectId, 
        ref: 'Review'
    },
    is_public:{
        type:Boolean,
        default:false
    }
})

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist