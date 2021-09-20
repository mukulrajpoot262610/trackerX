const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator/check')
const auth = require('../middleware/auth')

// @route  POST /api/auth
// @desc   Login a User
// @access Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Invalid Credentials').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        console.log(email)

        const isMatch = user.password === password

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 360000,
        }, (err, token) => {
            if (err) throw err
            res.json({ token })
        })

    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
})

// @route  GET /api/auth
// @desc   Get Logged in User
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.status(200).json({ user })
    } catch (err) {
        console.log(err.message)
        res.send({ err: "Server Error" })
    }
})

module.exports = router