const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

require("dotenv-flow").config();

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')

mongoose.connect(process.env.DBHOST, { useUnifiedTopology: true, useNewUrlParser: true}).catch(error => console.log("Error connecting to MongoDB: " + error))

mongoose.connection.once('open', () => console.log("Connected to MongoDB successfully."))

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000)

