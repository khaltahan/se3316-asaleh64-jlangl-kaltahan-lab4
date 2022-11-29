const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
let bodyParser = require('body-parser');
let multer = require('multer');
let csv = require('csvtojson');
const Artist =  require('../models/artist.model.js');
const Tracks = require('../models/track.model.js');

let upload =  multer({dest: 'uploads'})

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


router.get('/all',async (req, res)=>{
    try{
        const artists =  await Artist.find()
        res.json(artists);
    }
    catch(err){
        res.status().json({message: err.message});
    }
})

router.post('/', upload.single('file'),async (req, res)=>{
    csv()
    .fromFile('./uploads/raw_artists.csv')
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