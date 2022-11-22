require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://lab4:3316@cluster0.jkxlyny.mongodb.net",{useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(error=>{
    console.error(error)
}))
db.once('open',()=> console.log('Connected to Database'))

const registerRoute = require('./routes/register')
app.use('/register',registerRoute)

const loginRoute = require('./routes/login')
app.use('/login',loginRoute)




const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Listening on port ${PORT}`))