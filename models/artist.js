const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    bio: {
        type: String, 
        required: true
    },
    headshot: {
        type: Buffer,
        required: true
    },
    headshotType: {
        type: String,
        required: true
    }
})

artistSchema.virtual('headshotPath').get(function(){
    if(this.headshot != null && this.headshotType != null){
        return `data:${this.headshotType};charset=utf-8;base64,${this.headshot.toString('base64')}`;
    }
})

module.exports = mongoose.model('Artist', artistSchema)