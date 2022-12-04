const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;


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
        type:String,
        created:Date
    },
    description:{
        type:String,
        default:'A personal music list'
    },
    reviews:{
        type:[Schema.Types.ObjectId], 
        ref:'Review',
    },
    is_public:{
        type:Boolean,
        default:false
    }
})

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist