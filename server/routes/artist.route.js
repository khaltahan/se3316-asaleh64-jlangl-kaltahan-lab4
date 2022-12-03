const express = require('express');
const router = express.Router();
const Artist =  require('../models/artist.model.js');
const Tracks = require('../models/track.model.js');

router.get('/all',async (req, res)=>{
    try{
        const artists =  await Artist.find()
        res.json(artists);
    }
    catch(err){
        res.status().json({message: err.message});
    }
})

router.get('/',async (req,res)=>{
    try{
        const artists = await Artist.find()
        const artistSearch = [];
        artists.forEach(item =>{
            if(item.artist_id===req.body.artist_id){
                artistSearch.push(item)
            }
        }
        )
        res.send(artistSearch)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
})

//Get matching artist IDs based on artist name
router.get('/:name',async (req,res)=>{
    try{
        const artists = await Tracks.find()
        let artistSearch = [];
        artists.forEach(item =>{
                const condition1 = item.artist_name.toLowerCase().includes(req.params.name.toLowerCase());
                //Search by track title
                 if(condition1){
                artistSearch.push(item)
            }
        }
        )
            res.send(artistSearch)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
})

module.exports = router;