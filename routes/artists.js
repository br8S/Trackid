const express = require('express')
const router = express.Router()

const Artist = require('../models/artist')

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']


//Show all artists route

router.get('/', async (req, res) => {
    let searchOptions = {}

    //if search parameter is excluded we do not filter our parameters
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const artists = await Artist.find(searchOptions).sort({ name: 'asc' })
        res.render('artists/index', { 
            artists: artists, 
            searchOptions: req.query 
        })
    }
    catch{
        res.redirect('/')
    }
})

//New artist route
    //this one just shows the form to create a new artist
router.get('/new', (req,res) => {
    res.render('artists/new', { artist: new Artist() })
})

//Create artist route
    //this second one is responsible for actually putting the data in db
    //we are only creating stuff here so no need to render anything
router.post('/', async (req, res) => {
    const artist = new Artist({
        name: req.body.name, 
        bio: req.body.bio
    })
    saveHeadshot(artist, req.body.headshot)
     
    try{
        const newArtist = await artist.save()
        res.redirect('artists')
    }
    catch (error){
        console.log(error);
        res.render('artists/new', {
            artist: artist,
            errorMessage: 'Error creating a new artist'
        })
    }
})

//Show artist

//Update an artist route

//Delete an artist route

function saveHeadshot(artist, coverEncoded){
    if(coverEncoded == null) return
    const cover = JSON.parse(coverEncoded);
    if(cover != null && imageMimeTypes.includes(cover.type)){ //making sure image is correct format ie png jpg
        artist.headshot = new Buffer.from(cover.data, 'base64'); //allows us to create a buffer from some set of data
        artist.headshotType = cover.type;
    }
}

module.exports = router;