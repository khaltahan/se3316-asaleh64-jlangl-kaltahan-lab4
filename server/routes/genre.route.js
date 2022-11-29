const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
let bodyParser = require('body-parser');
let multer = require('multer');
let csv = require('csvtojson');
const Genre =  require('../models/genre.model.js')

let upload =  multer({dest: 'uploads/'})

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


router.get('/',async (req, res)=>{
    try{
        const genres =  await Genre.find()
        res.json(genres);
    }
    catch(err){
        res.status().json({message: err.message});
    }
})

router.post('/', upload.single('file'),async (req, res)=>{
    csv()
    .fromFile('./uploads/genres.csv')
    .then(obj=>{
        try{
        obj.forEach(async item =>{
            const Genres = new Genre({
            title: item.title,
            genre_id: item.genre_id,
            parent: item.parent,
        });
        Genres.save()
        })
        res.json({message:'Succesfully Uploaded'})
    }
    catch(err){
        err.json({message: err.message});
    }
    }) 
})

module.exports = router;