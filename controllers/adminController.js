const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Tour = require('../models/tourModel')

class adminController {
    async getTours(req, res) {
        try {
            const tours = await Tour.find()
            res.send(tours)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error'})
        }
    }

    async addTour(req, res) {
        const { destination, departDate, returnDate, city, price, image } = req.query;

        try {
            const newTour = new Tour({ destination, departDate, returnDate, city, price, image })
            await newTour.save()
            res.send(newTour)
        } catch (e) {
            console.log(e)
            res.status(400).json({ error: 'Error saving the tour' });
        }
    }

    async deleteTour(req, res) {
        const {tourID} = req.params

        try {
            const deletedTour = await Tour.findByIdAndDelete(tourID)  
            if (!deletedTour) {
                return res.status(404).json({ error: 'Tour not found' });
            } 
            res.send("Successfully deleted")
        } catch (e) {
            console.log(e)
            res.status(400).json({ error: 'Error deleting the tour' });
        }
    }

    async updateTour(req, res) {
        const tourID = req.params.tourID

        const { destination, departDate, returnDate, city, price, image } = req.query;
    
        try {
            const updatedTour = await Tour.findByIdAndUpdate(tourID, {destination: destination, departDate: departDate, returnDate: returnDate, city: city, price: price, image: image}, {new: true})
            if (!updatedTour) {
                return res.status(404).json({ error: 'Tour not found' });
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }
}

module.exports = new adminController()