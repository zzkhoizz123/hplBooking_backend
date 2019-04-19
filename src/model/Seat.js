const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatSchema = new Schema({
    startTime: {
        type: Date,
        require: true
    },
    endTime: {
        type: Date,
        require: true
    },
    STT: {
        type: Number,
        require: true
    },

    room:{
        type: Number,
        require: true
    },

    department:{
        type: Number,
        require: true
    },

    patient: {
        type: Object,
        require: true
    },

    doctor:{
        type: Object,
        require: false
    }
});

module.exports = Seat = mongoose.model('seat', SeatSchema);