const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/adminController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/', roleMiddleware(['ADMIN']), (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
})

router.get('/tours', roleMiddleware(['ADMIN']), controller.getTours)


router.post('/addTour', roleMiddleware(['ADMIN']), controller.addTour)

router.delete('/deleteTour/:tourID', roleMiddleware(['ADMIN']), controller.deleteTour)

router.put('/updateTour/:tourID', roleMiddleware(['ADMIN']), controller.updateTour)


module.exports = router