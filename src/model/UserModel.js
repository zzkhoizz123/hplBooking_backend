const bcrypt = require("bcryptjs");
const Promise = require("promise");
const moment = require("moment");

const ObjectId = require("mongodb").ObjectID;

const SeatModel = require('./Seat');
const UserModel = require('./User');


const CreateNewUser = (username, password, email, name, sex, newDoB, role, SSN, phoneNumber, department, room)=>{
    return new Promise((resolve, reject)=>{
        const DoB = moment(newDoB).toDate();
        // const startWork = moment(newstartWork).toDate()
        // const endWork = moment(newstartWork).add(duration, "minutes").toDate();
        UserModel.findOne(
            {
              $or: [{ username }, { email }, {SSN}, {phoneNumber}]
            },
            (err, tryfind) => {
              if (tryfind) {
                return reject("Username or Email or SSN or phoneNumber existed");
              }
              else if(err){
                reject("Username or Email existed")
              }
              password = bcrypt.hashSync(password);
              const user = new UserModel({
                username,
                password,
                email,
                name,
                sex,
                DoB,
                role, 
                SSN,
                phoneNumber,
               // workingDate,
                department,
                room
                // startWork,
                // endWork
              });
              UserModel.create(user)
                .then(user2=>{
                  UserModel.findById(user2._id)
                    .select("-password -__v")
                    .exec((err2, res) => {
                      if (err2) {
                        return reject("Error occur");
                      }
                      return resolve(res);
                    });
                })
                .catch(err=>{
                  console.log(err);
                  return reject("Error occur")
                })
            }
          );
    })
}

const VerifyUser = (username, password) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ username }, (err, user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          resolve({
            role: user.role,
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            SSN: user.SSN,
            DoB: user.DoB
          });
        } else {
          reject("Wrong credential");
        }
      } else {
        reject("Wrong credential");
      }
    });
  });
};

const HashPassword = password => {
  return bcrypt.hashSync(password);
};

const ResetPassword = (name, curpwd, newpwd) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ username: name }, (err, helper) => {
      if(err){
        return reject("Wrong username");
      }
      
      const rightPassword = bcrypt.compareSync(
        curpwd,
        helper.password
      );

      if (!rightPassword) {
        return reject("Wrong password");
      }

      UserModel.updateOne(
        { username: new RegExp("^" + name + "\\b", "i") },
        { $set: { password: HashPassword(newpwd) } },
        (err1, result) => {
          if (err1) {
            return reject("Error occur");
          }

          console.log("Ok: " + result);
          return resolve(result);
        }
      );
    });
  });
};

const GetUserByID = id => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ _id: new ObjectId(id) })
      .select("-password -__v")
      .exec((err, res) => {
        if (err) {
          return reject("Error occur");
        }
        return resolve(res);
      });
  });
};
module.exports = {
    CreateNewUser,
    VerifyUser,
    ResetPassword,
    GetUserByID
  };
  