const mongoose = require('mongoose');

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
    is_hidden:{
        type:Boolean,
        default:false
    }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review



