const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number, // 0: patient, 1: doctor, 2: admin
        require: true
    },

    startWork: { // use for doctor
        type: Date,
        require: false
    },

    endWork: { // use for doctor
        type: Date,
        require: false
    },
});

module.exports = User = mongoose.model('user', UserSchema);