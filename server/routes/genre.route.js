const express = require('express');
const router = express.Router();
const Genre =  require('../models/genre.model.js')

router.get('/',async (req, res)=>{
    try{
        const genres =  await Genre.find()
        res.json(genres);
    }
    catch(err){
        res.status().json({message: err.message});
    }
})

module.exports = router;