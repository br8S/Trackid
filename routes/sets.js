const express = require('express')
const router = express.Router()

const Set = require('../models/set')
const Artist = require('../models/artist')
const Genre = require('../models/genre')

//Show all sets route

router.get("/", async (req, res) => {
    let setSearch = Set.find()

    if (req.query.title != null && req.query.title != ''){
        setSearch = setSearch.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.genre != null && req.query.genre != ''){
        setSearch = setSearch.regex('genre', new RegExp(req.query.genre, 'i'))
    }
    if (req.query.postedBefore != null && req.query.postedBefore != ''){
        setSearch = setSearch.lte('createdDate', req.query.postedBefore)
    }
    if (req.query.postedAfter != null && req.query.postedAfter != ''){
        setSearch = setSearch.gte('createdDate', req.query.postedAfter)
    }
    //console.log(req.query.genre)
    
    try{
        const sets = await setSearch.sort({ title: 'asc' }).exec() //this order our books in asc alphabetical order
        res.render('sets/index', { 
            sets: sets,
            searchOptions: req.query
         })
    }
    catch{
        res.redirect('/')
    }
})

//New set route

router.get("/new", async (req, res) => {
    renderNewPage(res, new Set())
})

//Create set route

router.post("/", async (req, res) => {
    const set = new Set({
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        link: req.body.link
    })
    
    try{
        const newSet = await set.save()
        res.redirect(`/sets/${newSet.id}`)
    }
    catch{
        renderNewPage(res, set, true)
    }
})

//Show single set route 
router.get('/:id', async (req, res) => {
    try{
        const set = await Set.findById(req.params.id).populate('artist').exec()
        res.render('sets/show', {
            set: set
        })
    }
    catch{
        res.redirect('/')
    }
})

//Update set route
router.get('/:id/edit', async (req,res) => {
    try{
        const set = await Set.findById(req.params.id)
        renderEditPage(res, set)
    }
    catch{
        res.redirect('/')
    }
})

router.put("/:id", async (req, res) => {
    let set
    
    try{
        set = await Set.findById(req.params.id)
        set.title = req.body.title
        set.artist = req.body.artist
        set.genre = req.body.genre
        set.link = req.body.link

        await set.save()
        res.redirect(`/sets/${set.id}`)
    }
    catch{
        if(set != null) {
            renderEditPage(res, set, true)
        }
        else{
            redirect('/')
        }
    }
})

//Delete set page
router.delete('/:id', async (req,res) => {
    let set
    try{
        set = await Set.findById(req.params.id)
        await set.remove()
        res.redirect('/sets')
    }
    catch{
        if (set != null) {
            res.render('sets/show', {
                set: set,
                errorMessage: 'Could not remove set'
            })
        }
        else {
            res.redirect('/')
        }
    }
})

async function renderNewPage(res, set, hasError = false) {
    try{
        const artists = await Artist.find({})
        const genres = await Genre.find({})
        const params =  {
            artists: artists,
            genres: genres,
            set: set
        }

        if (hasError){ 
            params.errorMessage = "Error creating set." 
        }
        res.render('sets/new', params)
    }
    catch{
        res.redirect('/sets')
    }
}

async function renderEditPage(res, set, hasError = false) {
    try{
        const artists = await Artist.find({})
        const genres = await Genre.find({})
        const params =  {
            artists: artists,
            genres: genres,
            set: set
        }

        if (hasError){ 
            params.errorMessage = "Error editing set." 
        }
        res.render('sets/edit', params)
    }
    catch{
        res.redirect('/sets')
    }
}

module.exports = router;