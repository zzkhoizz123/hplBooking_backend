const Promise = require("promise");

const ObjectId = require("mongodb").ObjectID;

const SeatModel = require('./Seat');
const UserModel = require('./User');


const CreateSeatWithTime = (startDate, endDate, department, userId, lst1) => {
return new Promise((resolve, reject)=>{

    var lst = lst1;
    //let check = true;
    //while(check){
    start:
    //continue start;
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
                    if(arrSeat.length < 20){
                        console.log("length " + arrSeat.length);
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
                            return resolve(seat);       
                        })
                    }
                    else {
                        lst.push(doctor._id);
                        CreateSeatWithTime(startDate, endDate, department, userId, lst)
                            .then (seat=>{
                                return resolve(seat);
                            })
                            .catch(err=>{
                                return reject(err);
                            })
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

const GetSeatByID = id => {
    return new Promise((resolve, reject) => {
      SeatModel.findOne({ _id: new ObjectId(id) })
        .select("-__v")
        .exec((err, res) => {
          if (err) {
            return reject("Error occur");
          }
          return resolve(res);
        });
    });
  };

  const GetAllSeatByUserID = userid => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({_id: new ObjectId(userid)})
            .then (user=>{
                if(user.role == 0){
                    SeatModel.find({ patient: new ObjectId(userid) })
                    .then(data=>{
                        return resolve(data); 
                    })
                    .catch(err=>{
                        return reject("Error occur");
                    }) 
                }
                else{
                    SeatModel.find({ doctor: new ObjectId(userid) })
                    .then(data=>{
                        return resolve(data); 
                    })
                    .catch(err=>{
                        return reject("Error occur");
                    }) 
                }
            })
            .catch(err =>{
                return reject("Error occur");
            })       
     });
  };

  const DeleteSeatByID = (seatid, userid) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({_id: new ObjectId(userid)})
            .then (user=>{
                if(user.role == 0){
                    SeatModel.deleteOne({ 
                        $and:[
                          {_id: new ObjectId(seatid)},
                          {patient: new ObjectId(userid)}
                          ]
                      })
                      .select("-__v")
                      .exec((err, res) => {
                        if (err) {
                          return reject("Error occur");
                        }
                        return resolve(res);
                      });
                }
                else{
                    return reject("Error occur");
                }               
            })
            .catch(err=>{
                return reject("Error occur");
            })
    });
  };

module.exports = {
    CreateSeatWithTime,
    GetAllSeatByUserID,
    GetSeatByID,
    DeleteSeatByID
  };





