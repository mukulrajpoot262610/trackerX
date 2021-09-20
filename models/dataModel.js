const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    transaction_name: {
        type: String,
        required: true
    },
    transaction_income_amount: {
        type: Number,
        required: true,
    },
    transaction_expense_amount: {
        type: Number,
        required: true,
    },
    transaction_type: {
        type: String,
        required: true,
    },
    transaction_date: {
        type: String,
        required: true,
    },
    transaction_month: {
        type: Number,
        required: true,
    },
    transaction_year: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('data', DataSchema)