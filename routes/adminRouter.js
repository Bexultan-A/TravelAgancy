const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const toursData = require('../tours.json');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
})

router.get('/tours', (req, res) => {
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


router.post('/addTour', (req, res) => {
    const { destination, departDate, returnDate, city, price, image } = req.query;

    const tourID = `Tour${Object.keys(toursData).length + 1}`
    toursData[tourID] = { tourID, destination, departDate, returnDate, city, price, image }

    fs.writeFileSync('tours.json', JSON.stringify(toursData, null, 2));
    res.json({ message: 'Tour added successfully', newTourId: tourID });
})

router.delete('/deleteTour/:tourID', (req, res) => {
    const {tourID} = req.params

    if (toursData[tourID]) {
        delete toursData[tourID]

        fs.writeFileSync('tours.json', JSON.stringify(toursData, null, 2));
    } else {
        res.status(404).json({ error: `Tour ${tourID} not found` });
    }
})

router.put('/updateTour/:tourID', (req, res) => {
    const tourID = req.params.tourID

    const { destination, departDate, returnDate, city, price, image } = req.query;

    try {
        toursData[tourID] = { tourID, destination, departDate, returnDate, city, price, image }
        fs.writeFileSync('tours.json', JSON.stringify(toursData, null, 2));
    } catch (err) {
        res.status(500).send(err)
    }

})


module.exports = router