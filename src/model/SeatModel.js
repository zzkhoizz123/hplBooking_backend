const Promise = require("promise");

const ObjectId = require("mongodb").ObjectID;

const SeatModel = require('./Seat');
const UserModel = require('./User');


const CreateSeatWithTime = (startDate, endDate, department, userId) => {
return new Promise((resolve, reject)=>{

    const id = new ObjectId("000d9f7a65ddd10ea830b293");
    var lst = [id];
    //let check = true;
    //while(check){
        UserModel.findOne({
            $and:[
                {_id : {$nin: lst}},
                {department: department},
                {role: 1}
            ]
        })
        .then(doctor=>{
            if(doctor !== null){
                SeatModel.find({
                    $and:[
                        {doctor: doctor._id},
                        {startTime: {$eq: startDate.toDate()} }
                    ]
                })
                .then(arrSeat =>{
                    if(arrSeat.length < 2){
                        //console.log("AAAAAAAAAa");
                        const seat = new SeatModel({
                            startTime : startDate,
                            endTime : endDate,
                            patient: new ObjectId(userId),
                            STT: arrSeat.length + 1,
                            department: department,
                            doctor: doctor._id,
                            room: doctor.room
                        });
                        SeatModel.create(seat)
                        .then(seat=>{
                            UserModel.findById(seat._id)
                            .select("-__v")
                            .exec((err2, res) => {
                            if (err2) {
                                return reject("Error occur hereAAA");
                            }
                            return resolve(res);
                           
                            });
                        })
                    }
                    else {
                        lst.push(doctor._id);
                    }                 
                    })   
            }
            else{
                return reject("Can not find doctor");
            }
        })
        .catch(err=>{
            return reject("Error occur hereBB");
        })
   // }  
});
}

module.exports = {
    CreateSeatWithTime
  };





