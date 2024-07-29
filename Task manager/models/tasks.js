const mongoose = require('mongoose')

mongoose.set();
const mongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide a valid name'],
        trim: true,
        maxLength: [20, 'characters must not exceed 20']
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Taskmanager', mongooseSchema)