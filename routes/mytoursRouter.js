const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const toursData = require('../mytours.json');
const mytoursData = require('../mytours.json');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/mytours.html'));
})


router.get('/tours', (req, res) => {
    fs.readFile('./mytours.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading mytours.json:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }    
        res.status(200)
        return res.send(data);
    });
})

router.delete('/deleteTour/:tourID', (req, res) => {
    const {tourID} = req.params

    if (mytoursData[tourID]) {
        delete mytoursData[tourID]

        fs.writeFileSync('mytours.json', JSON.stringify(toursData, null, 2));
    } else {
        res.status(404).json({ error: `Tour ${tourID} not found` });
    }
})


module.exports = router