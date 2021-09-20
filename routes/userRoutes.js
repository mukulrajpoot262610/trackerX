const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator/check')

// @route  POST /api/user
// @desc   Register a User
// @access Public
router.post('/', [
    check('name', 'Please Enter name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if (user) {
            return res.json({ errors: [{ msg: 'User Already Exists' }] })
        }

        user = new User({ name, email, password })

        // HASHING PASSWORD
        // const salt = bcrypt.genSalt(10)
        // user.password = await bcrypt.hash(password, salt)

        await user.save()

        // GEN TOKEN
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router