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

const changePassRoute = require('./routes/changepass.route')
app.use('/account/change-password',changePassRoute)

const registerRoute = require('./routes/register.route')
app.use('/register',registerRoute)

const loginRoute = require('./routes/login.route')
app.use('/login',loginRoute)

const PORT = process.env.PORT;
app.listen(PORT,() => console.log(`Listening on port ${PORT}`))