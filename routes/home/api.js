const express = require('express');
const router = express.Router();
const fs = require('fs');



router.all('/*', (req,res,next) => {
    next()
});

router.get('/json', (req,res) => {
    fs.readFile('../../public/uploads/data.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
    
});







module.exports = router;