require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://lab4:3316@cluster0.jkxlyny.mongodb.net/test",{useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(error=>{
    console.error(error)
}))
db.once('open',()=> console.log('Connected to Database'))

// route to change user password 
const changePassRoute = require('./routes/changepass.route')
app.use('/account/change-password',changePassRoute)

// route to register user 
const registerRoute = require('./routes/register.route')
app.use('/register',registerRoute)

// route to login user 
const loginRoute = require('./routes/login.route')
app.use('/login',loginRoute)

// playlist routes 
const playlistRoute = require('./routes/playlist.routes')
app.use('/api/playlist', playlistRoute)

const trackRoute = require('./routes/track.route')
app.use('/api/tracks',trackRoute)


const PORT = process.env.PORT;
app.listen(PORT,() => console.log(`Listening on port ${PORT}`))