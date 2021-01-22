const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    bio: {
        type: String, 
        required: false
    },
    artistImage: {
        type: Buffer,
        required: false
    },
    artistImageType: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Artist', artistSchema)