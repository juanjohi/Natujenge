

const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'transfer'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },

},
    { timestamps: true }
)

module.exports = mongoose.model('Transactions', transactionSchema)