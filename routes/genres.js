const express = require('express')
const router = express.Router()

const Artist = require('../models/artist')
const Set = require('../models/set')
const Genre = require('../models/genre')

//Show all genres route

router.get("/", async (req,res) => {
    let searchOptions = {}

    //if search parameter is excluded we do not filter our parameters
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const genres = await Genre.find(searchOptions).sort({ name: 'asc' })
        res.render('genres/index', { 
            genres: genres, 
            searchOptions: req.query 
        })
    }
    catch{
        res.redirect('/')
    }
})

//Get new genre route

router.get("/new", (req,res) => {
    res.render('genres/new', { genre: new Genre() })
})

//Create new genre route

router.post("/", async (req,res) => {
    const genre = new Genre({
        name: req.body.name, 
        description: req.body.description
    })
     
    try{
        const newGenre = await genre.save()
        res.redirect('genres')
    }
    catch (error){
        console.log(error);
        res.render('genres/new', {
            genre: genre,
            errorMessage: 'Error creating a new genre'
        })
    }
})


//Delete genre route

module.exports = router
