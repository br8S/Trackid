const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const artistRouter = require('./routes/artists')
const setRouter = require('./routes/sets')

require("dotenv-flow").config();

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')

mongoose.connect(process.env.DBHOST, { useUnifiedTopology: true, useNewUrlParser: true}).catch(error => console.log("Error connecting to MongoDB: " + error))

mongoose.connection.once('open', () => console.log("Connected to MongoDB successfully."))

app.use('/', indexRouter);
app.use('/artists', artistRouter);
app.use('/sets', setRouter);

const PORT = process.env.PORT || 3000; //if for some reason something goes wrong with .env then 3000

//start up server
app.listen(PORT, () => { //running at port 3000
    console.log("Server is running on port: " + PORT);
})

module.exports = app;