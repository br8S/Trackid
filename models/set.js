const mongoose = require('mongoose')

const setSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Artist'
    },
    genre: {
        type: String,
        required: true,
    },
    songs: { 
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Set', setSchema)