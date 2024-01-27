const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const toursData = require('../tours.json');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/tours.html'));
})

router.get('/tours', (req, res) => {
    // Read the tours.json file
    fs.readFile('./tours.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tours.json:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }    
        res.status(200)
        return res.send(data);
    });
})


router.get('/search', (req, res) => {
    const { destination, departDate, returnDate, city } = req.query;
    // Filter tours based on search parameters
    const filteredTours = Object.entries(toursData).filter(([tourId, tour]) => {
        return (
            (!destination || tour.destination.toLowerCase() === destination.toLowerCase()) &&
            (!departDate || tour.departDate === departDate) &&
            (!returnDate || tour.returnDate === returnDate) &&
            (!city || tour.city.toLowerCase() === city.toLowerCase())
        );
    });

    res.send(filteredTours);
});

module.exports = router