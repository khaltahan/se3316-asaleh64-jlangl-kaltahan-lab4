const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

// user review schema 
const reviewSchema = new mongoose.Schema({
    reviewer:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    rating:{
        type:Number,
        required:true
    }, 
    comments:{
        type:String,
    },
    date_of_review:{
        type:String,
        created:Date
    },
    is_hidden:{
        type:Boolean,
        default:false
    }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review



