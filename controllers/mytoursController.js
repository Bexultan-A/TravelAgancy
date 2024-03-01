const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const MyTour = require('../models/myTourModel')
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

class mytoursController {
    async getAllTours(req, res) {
        try{
            const token = jwt.verify(req.cookies.token, secret)
            const userid = token.id
            const mytours = await MyTour.find({owner: userid})
            res.status(200).send(mytours);
        } catch (e) {
            console.log(e)
        }   
    }

    async deleteTour(req, res) {
        try{
            const { tourID } = req.params;
            console.log(tourID)
            const deletedTour = await MyTour.findByIdAndDelete(tourID)
            res.status(200).send(deletedTour)
        } catch (e) {
            console.log(e)
        }   
    }
}

module.exports = new mytoursController()