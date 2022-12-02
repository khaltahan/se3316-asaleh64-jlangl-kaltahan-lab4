const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
let bodyParser = require('body-parser');
let multer = require('multer');
let csv = require('csvtojson');
const Track =  require('../models/track.model.js');

let upload =  multer({dest: 'uploads'})

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


router.get('/all',async (req, res)=>{
    try{
        const tracks =  await Track.find()
        res.json(tracks);
    }
    catch(err){
        res.status().json({message: err.message});
    }
})

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
})


//Get n matching trackIDs based on track title
router.get('/track_title/:track_title',async (req,res)=>{
    try{

        const tracks = await Track.find({track_title: req.params.track_title})
        res.send(tracks)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
})

//Get n matching trackIDs based on album title
router.get('/album_title/:album_title',async (req,res)=>{
    try{

        const albums = await Track.find({album_title: req.params.album_title})
        res.send(albums)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
})

//Get n matching trackIDs based on track title
router.get('/artist_name/:artist_name',async (req,res)=>{
    try{

        const artists = await Track.find({artist_name: req.params.artist_name})
        res.send(artists)
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
})

module.exports = router;