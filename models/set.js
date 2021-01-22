const mongoose = require('mongoose')

const setSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: false
    },
    songs: { 
        type: Array,
        required: false
    }
})