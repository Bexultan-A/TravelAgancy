const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const toursData = require('../tours.json');
const mytoursData = require('../mytours.json');
const apiKey = '9216cbcbe071459a96b94631241901';

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

router.get('/singleTour/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/tour.html'))
})

router.get('/getTourDetails/:tourID', (req, res) => {
    const tourID = req.params.tourID;

    if (toursData[tourID]) {
        res.send(toursData[tourID]);
    } else {
        res.status(404).json({ message: `Tour ${tourID} not found` });
    }
})

router.get('/api/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the request was successful
        if (response.ok) {
            res.send(data);
        } else {
            res.status(response.status).json({ message: data.error.message || 'Failed to fetch weather data' });
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
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


router.post('/addTour/:tourID', (req, res) => {
    const tourID = req.params.tourID
    const destination = toursData[tourID].destination;
    const departDate = toursData[tourID].departDate;
    const returnDate = toursData[tourID].returnDate;
    const city = toursData[tourID].city;
    const price = toursData[tourID].price;
    const image = toursData[tourID].image;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var HH = String(today.getHours());
    var MM = String(today.getMinutes());
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd + " time: " + HH + ":" + MM;
    const dateAdded = today

    mytoursData[tourID] = { tourID, destination, departDate, returnDate, city, price, image, dateAdded }

    fs.writeFileSync('mytours.json', JSON.stringify(mytoursData, null, 2));
    res.json({ message: 'Tour added successfully', newTourId: tourID });
})

module.exports = router