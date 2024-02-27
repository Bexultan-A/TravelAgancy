const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const controller = require('../controllers/mytoursController');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware,(req, res) => {
    res.sendFile(path.join(__dirname, '../views/mytours.html'));
})


router.get('/tours', authMiddleware, controller.getAllTours)

router.delete('/deleteTour/:tourID', authMiddleware, controller.deleteTour)


module.exports = router