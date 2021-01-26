const express = require('express')
const router = express.Router()

const Set = require('../models/set')
const Artist = require('../models/artist')

//Show all sets route

router.get("/", async (req, res) => {
    let setSearch = Set.find()

    if (req.query.title != null && req.query.title != ''){
        setSearch = setSearch.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.postedBefore != null && req.query.postedBefore != ''){
        setSearch = setSearch.lte('createdDate', req.query.postedBefore)
    }
    if (req.query.postedAfter != null && req.query.postedAfter != ''){
        setSearch = setSearch.gte('createdDate', req.query.postedAfter)
    }
    
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
        songs:  req.body.song,
        link: req.body.link
    })

    try{
        const newSet = await set.save()
        res.redirect('sets')
    }
    catch{
        renderNewPage(res, set, true)
    }
})

//Show single set route 

//Update set route

//Delete set page

async function renderNewPage(res, set, hasError = false) {
    try{
        const artists = await Artist.find({})
        const params =  {
            artists: artists,
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

module.exports = router;