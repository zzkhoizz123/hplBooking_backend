const Router = require("express");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const UserModel = require("./../../model/UserModel");
const RequestError = require("./../../utils/RequestError");

const departmentConvert = require("./../../utils/DepartmentConvert");

const router = Router();

router.post("/signup", (req, res) => {    
    
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    const sex = req.body.sex;
    const DoB = req.body.DoB;
    const role = req.body.role;
    const SSN = req.body.SSN;
    const phoneNumber = req.body.phoneNumber;  
   // const workingDate = req.body.workingDate; //[1,2,1,2,3,2]
    let department = "";
    let room = 0;
    if(role == 1 ){
      department = departmentConvert(req.body.department);
      room = req.body.room;
      console.log("department " + department);
    }
    // const startWork = req.body.startWork;
    // const duration = req.body.duration; // count in minutes
  
  
    if (!name || !email || !username || !password || !SSN || !phoneNumber) {
        res.json({
            message: "Error occur",
            success: false,
            error: 0,
            data : {}
          });
      return;
    }
  
    if (role == null) {
      role = 0; // owner
    }
  
    UserModel.CreateNewUser(
      username,
      password,
      email,
      name,
      sex,
      DoB,
      role,
      SSN,
      phoneNumber,
      //workingDate,
      department,
      room
    )
      .then(data => {
        res.status(200);
        res.json({
          message: "Signup Success",
          success: true,
          error: 0,
          data
        });
      })
      .catch(msg => {
        res.json({
            message: msg,
            success: false,
            error: 0,
            data : {}
          });
        return;
      });
  });


  router.post("/signin", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      res.json({
        message: "Error occur",
        success: false,
        error: 0,
        data : {}
      });
      return;
    }
  
    UserModel.VerifyUser(username, password)
      .then(user => {
        const token = jwt.sign(user, "secret");
        user["token"] = token;
        res.status(200);
        res.json({
          message: "Login success",
          success: true,
          error: 0,
          data: user
        });
      })
      .catch(msg => {
        res.json({
          message: "Error occur",
          success: false,
          error: 0,
          data : {}
        });
        return;
      });
  });


  router.post("/reset_password", (req, res, next) => {
    const name = req.body.username;
    const pass = req.body.password;
    const newpass = req.body.new_password;
  
    if (!name || !pass || !newpass) {
      res.json({
        message: "Error occur",
        success: false,
        error: 0,
        data : {}
      });
      return;
    }
  
    UserModel.ResetPassword(name, pass, newpass)
      .then(result => {
        res.status(200);
        return res.json({
          message: "Success Reset Password",
          success: true,
          error: 0,
          data: {}
        });
      })
      .catch(msg => {
        res.json({
          message: "Error occur",
          success: false,
          error: 0,
          data : {}
        });
        return;
      });
  });

  router.get("/me", (req, res, next) => {
    UserModel.GetUserByID(req.user.id)
      .then(data => {
        res.status(200);
        res.json({
          message: "User with Id: " + req.user.id + " info",
          success: true,
          error: 0,
          data
        });
      })
      .catch(msg => {
        res.json({
          message: "Error occur",
          success: false,
          error: 0,
          data : {}
        });
        return;
      });
  });
  
module.exports = router;