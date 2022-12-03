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

<<<<<<< HEAD
router.post('/', upload.single('file'),async (req, res)=>{
    csv()
    .fromFile('./uploads/raw_tracks.csv')
    .then(obj=>{
        try{
            for(let i=0;i<1000;i++){
                const Tracks = new Track({
                    track_id:obj[i].track_id,
                    album_id:obj[i].album_id,
                    album_title:obj[i].album_title,
                    artist_id:obj[i].artist_id,
                    artist_name:obj[i].artist_name,
                    tags:obj[i].tags,
                    track_date_created:obj[i].track_date_created,
                    track_date_recorded:obj[i].track_date_recorded,
                    track_duration:obj[i].track_duration,
                    track_genres:obj[i].track_genres,
                    track_number:obj[i].track_number,
                    track_title:obj[i].track_title,
                    });
                    Tracks.save()
            }
        res.json({message:'Succesfully Uploaded'})
    }
    catch(err){
        err.json({message: err.message});
    }
    })
=======
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
>>>>>>> main
})


//Get n matching trackIDs based on track title
router.get('/track_title/:track_title',async (req,res)=>{
    try{
        const tracks = await Track.find()
        const results = handleTitleSearch(req.params.track_title,tracks)
        res.send(results);
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
})

//Get n matching trackIDs based on album title
router.get('/album_title/:album_title',async (req,res)=>{
    try{

        const tracks = await Track.find()
        const results = handleAlbumSearch(req.params.album_title,tracks)
        res.send(results);
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
})

//Get n matching trackIDs based on track title
router.get('/artist_name/:artist_name',async (req,res)=>{
    try{

        const tracks = await Track.find()
        const results = handleArtistSearch(req.params.artist_name,tracks)
        res.send(results);
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
})

//Function to check if input is only characters from A-Z
const handleTitleSearch = function(input, tracks){
    const resultArr = [];
    const keywords = input.split(/[.\-=/_,]/)

    tracks.forEach(item =>{
        keywords.forEach(value =>{
            if(item.track_title.toLowerCase().includes(value.toLowerCase())){
                resultArr.push(item);
            }
        })
    })
    return resultArr;
};

const handleAlbumSearch = function(input, tracks){
    const resultArr = [];
    const keywords = input.split(/[.\-=/_,]/)

    tracks.forEach(item =>{
        keywords.forEach(value =>{
            if(item.album_title.toLowerCase().includes(value.toLowerCase())){
                resultArr.push(item);
            }
        })
    })
    return resultArr;
};

const handleArtistSearch = function(input, tracks){
    const resultArr = [];
    const keywords = input.split(/[.\-=/_,]/)

    tracks.forEach(item =>{
        keywords.forEach(value =>{
            if(item.artist_name.toLowerCase().includes(value.toLowerCase())){
                resultArr.push(item);
            }
        })
    })
    return resultArr;
};

module.exports = router;