const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true, 
    },
    name: {
        type: String,
        required: true
    },  
    sex: {
        type: String,
        require: true
    },
    DoB: {
        type: Object,
        require: false
    },
    SSN: {
        type: String,
        require: true,
    },
    role: {
        type: Number, // 0: patient, 1: doctor, 2: admin
        require: true,
        default: 0
    },
    phoneNumber: {
        type: String,
        require: false,
    },
    
    // workingDate:{ //[1,2,1,2,1,2] // 1: 7h-11h, 2: 1h-5h, 3: both
    //      type: [Number],
    //      require: false,
    //      default: null
    // },

    department:{
        type: String,
        require: false,
        default: null
    },
    
    room:{ // use for doctor
        type: Number,
        require: false,
        default: null
    }
});

module.exports = User = mongoose.model('user', UserSchema);