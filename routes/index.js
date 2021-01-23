const express = require('express');
const router = express.Router();

const Set = require('../models/set')

router.get('/', async (req, res) => {
    let sets
    try{
        sets = await Set.find().sort({ createdDate: 'desc' }).limit(10).exec()
    }
    catch(error){
        console.log(error)
        sets = []
    }
    res.render('index', { sets: sets })
})

module.exports = router;