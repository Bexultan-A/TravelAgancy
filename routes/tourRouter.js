const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const controller= require('../controllers/tourController')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/tours.html'));
})

router.get('/tours', controller.getAllTours);

router.get('/singleTour/:id', controller.getSingleTour);

router.get('/getTourDetails/:tourID', controller.getTourDetails);

router.get('/api/weather/:city', controller.getWeather);

router.get('/search', controller.searchTours);

router.post('/addTour/:tourID', controller.addTour);

module.exports = router