const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const apiKey = '9216cbcbe071459a96b94631241901';
const Tour = require('../models/tourModel')
const myTour = require('../models/myTourModel');
const User = require('../models/User');

class tourController {
    async getAllTours(req,res) {
        try {
            const tours = await Tour.find()
            res.send(tours)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error'})
        }
    }

    async getSingleTour(req,res) {
        try {
            res.sendFile(path.join(__dirname, '../views/tour.html'));
        } catch (e) {
            console.log(e)
        }
    }

    async getTourDetails(req,res) {
        try {
            const tourID = req.params.tourID;
            const tour = await Tour.findById(tourID)
            if (tour) {
                res.send(tour);
            } else {
                res.status(404).json({ message: `Tour ${tourID} not found` });
            }
        } catch (e) {
            console.log(e)
        }
    }

    async getWeather(req,res) {
        const city = req.params.city;
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                res.send(data);
            } else {
                res.status(response.status).json({ message: data.error.message || 'Failed to fetch weather data' });
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async searchTours(req,res) {
        try {
            const { destination, departDate, returnDate, city } = req.query;
            let query = {}

            if(destination != '') {
                query.destination = destination
            }
            if(departDate != '') {
                query.departDate = departDate
            }
            if(returnDate != '') {
                query.returnDate = returnDate
            }
            if(city != '') {
                query.city = city
            }

            const filteredTours = await Tour.find(query).exec()

            res.send(filteredTours);
        } catch (e) {
            console.log(e)
        }
    }

    async addTour(req,res) {
        try {
            const tourID = req.params.tourID;
            const tour = await Tour.findById(tourID)
            const destination = tour.destination;
            const departDate = tour.departDate;
            const returnDate = tour.returnDate;
            const city = tour.city;
            const price = tour.price;
            const image = tour.image;
        
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var HH = String(today.getHours());
            var MM = String(today.getMinutes());
            var yyyy = today.getFullYear();
        
            today = yyyy + '-' + mm + '-' + dd + " time: " + HH + ":" + MM;
            const dateAdded = today;        

            const newMyTour = new myTour({
                destination: destination,
                departDate: departDate,
                returnDate: returnDate,
                city: city,
                price: price,
                image: image,
                dateAdded: dateAdded,
                owner: req.cookies.userid
            })
            await newMyTour.save()
            res.json({ message: 'Tour added successfully', newTourId: tourID });
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new tourController()