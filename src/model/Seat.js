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
    owner: {
        type: Schema.Types.ObjectId,
        require: true
    }
});

module.exports = Seat = mongoose.model('seat', SeatSchema);