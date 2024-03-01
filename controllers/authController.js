const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config")
const fs = require('fs')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Error", errors})
            }
            const {username, password} = req.query;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "User with that username already exists!"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: "Successfully signedUp"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.query
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `User: ${username} not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Wrong password`})
            }
            const token = generateAccessToken(user._id, user.roles)
            res.cookie('token', token)
            return res.json({message: "Logged in as " + username})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async logout(req, res) {
        try {
            res.cookie('token', '')
            return res.json({message: "Logged Out"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Logout error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()