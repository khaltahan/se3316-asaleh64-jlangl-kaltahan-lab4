const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
let bodyParser = require('body-parser');
let multer = require('multer');
let csv = require('csvtojson');
const Track =  require('../models/track_model.js');

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
        obj.forEach(async item =>{
            const Artists = new Artist({
            artist_id: item.artist_id,
            artist_image_file: item.artist_image_file,
            artist_name : item.artist_name,
            artist_location: item.artist_location,
            artist_active_year_begin: item.artist_active_year_begin,
            artist_members: item.artist_members,
            artist_website: item.artist_website,
        });
        Artists.save()
        })
        res.json({message:'Succesfully Uploaded'})
    }
    catch(err){
        err.json({message: err.message});
    }
    })
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