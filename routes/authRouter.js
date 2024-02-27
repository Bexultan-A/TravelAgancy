const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const path = require('path')
const {check} = require("express-validator")
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.post('/registration', [
    check("username","Username cannot be empty!").notEmpty(),
    check("password","Password has to be at least 4 or maximum 10 symbols").isLength({min: 4, max: 10})
], controller.registration)

router.post('/login', controller.login)

router.post('/logout', authMiddleware, controller.logout)

router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)


router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/registration.html'))
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
})

module.exports = router