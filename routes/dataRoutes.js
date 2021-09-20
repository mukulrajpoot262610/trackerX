const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Data = require('../models/dataModel')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator/check')
const auth = require('../middleware/auth')

// @route  POST /api/data
// @desc   Add Transactions
// @access Private
router.post('/', auth, async (req, res) => {

    const { transaction_name, transaction_income_amount, transaction_expense_amount, transaction_date, transaction_type, transaction_month, transaction_year } = req.body

    try {
        const user = await User.findById(req.user.id).select('-password')

        let data = new Data({
            transaction_name,
            transaction_income_amount,
            transaction_expense_amount,
            transaction_date,
            transaction_type,
            transaction_month,
            transaction_year,
            user: req.user.id,
        })

        const dataAdded = await data.save()
        res.json({ data: dataAdded })

    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
})

// @route  GET api/data/:user_id
// @desc   Get Data by USER ID
// @access Private
router.get('/:user_id', auth, async (req, res) => {
    try {

        const data = await Data.find({ user: req.params.user_id })

        if (!data) {
            return res.status(404).json({ errors: [{ msg: "Not Found" }] })
        }

        res.json({ data })

    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] })
        }
        res.status(500).send('Server Error')
    }
})

module.exports = router