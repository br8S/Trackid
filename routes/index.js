const express = require('express');
const router = express.Router();

const Set = require('../models/set')
const Artist = require('../models/artist')

router.get('/', async (req, res) => {
    let sets
    let artists
    try{
        sets = await Set.find().sort({ createdDate: 'desc' }).limit(10).exec()
        artists = await Artist.find().sort({ createdDate: 'desc' }).limit(10).exec()
    }
    catch(error){
        console.log(error)
        sets = []
        artists =[]
    }
    res.render('index', { sets: sets, artists: artists })
})

module.exports = router;