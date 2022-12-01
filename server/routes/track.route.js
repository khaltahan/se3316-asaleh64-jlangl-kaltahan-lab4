const express = require('express');
const router = express.Router();
const Track =  require('../models/track.model.js');


router.get('/all',async (req, res)=>{
    try{
        const tracks =  await Track.find()
        res.json(tracks);
    }
    catch(err){
        res.status().json({message: err.message});
    }
})

router.get('/',async (req,res)=>{
    try{
        const tracks = await Track.find()
        const trackSearch = [];
        tracks.forEach(item =>{
            if(item.track_id===req.body.track_id){
                trackSearch.push(item)
            }
        }
        )
        res.send(trackSearch)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
})


//Get n matching trackIDs based on track title
router.get('/title/:track_title',async (req,res)=>{
    try{
        const tracks = await Track.find()
        let trackSearch = [];
        tracks.forEach(item =>{
                const condition1 = item.track_title.charAt(0).toLowerCase().includes(req.params.track_title.toLowerCase());
                //Search by track title
                 if(condition1 && trackSearch.length<50){
                trackSearch.push(item)
            }
        }
        )
            res.send(trackSearch)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
})

//Get n matching trackIDs based on album title
router.get('/album/:album_title',async (req,res)=>{
    try{
        const tracks = await Track.find()
        let trackSearch = [];
        tracks.forEach(item =>{
                const condition1 = item.album_title.charAt(0).toLowerCase().includes(req.params.album_title.toLowerCase());
                //Search by album title
                 if(condition1 && trackSearch.length<50){
                trackSearch.push(item)
            }
        }
        )
            res.send(trackSearch)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
})

module.exports = router;