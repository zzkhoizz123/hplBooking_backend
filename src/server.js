const moment = require("moment")

const express =  require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("express-jwt");
const gracefulShutdown = require("http-graceful-shutdown");
const every = require('every-moment');
const nodemailer = require('nodemailer');

const RequestError = require("./utils/RequestError");
const server_config = require("./config/server");
const SeatModel = require("./model/SeatModel");
const UserModel = require("./model/UserModel");



const api = require("./api/api");

const app = express();

app.use(cors());

app.use("/**", (req, res, next) => {
  console.log("[" + req.method + "] " + req.originalUrl);
  // logger.info(JSON.stringify(req.body));
  next();
});

app.use(
    jwt({ secret: server_config.TOKEN_SECRET }).unless({
      path: ["/api/v1/users/signin", "/api/v1/users/signup", "/api/v1/users/"]
    })
  );
app.use(bodyParser.json());

app.use("/api/", api);

// error handling
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    // jwt auth error
    res.status(401);
    res.json({
      message: "Invalid Token",
      success: false,
      error: 0,
      data: {}
    });
    res.end(); 
  // } else if (err instanceof RequestError) {
  //   // request error
  //   res.status(err.status);
  //   res.json({
  //     message: err.message,
  //     success: false,
  //     error: err.code,
  //     data: {}
  //   });
  //   res.end();
  } else {
    // other error
    console.log(err);
    res.status(500);
    res.json({
      message: err,
      success: false,
      error: -1,
      data: {}
    });
    res.end();
  }
});




const setTimer = ()=>{
  var timer = every(24, 'hours', function() {
    console.log(this.duration);
    SeatModel.SendMailForTodaySeat()
      .then(data=>{
        data.forEach(element => {
          UserModel.GetUserByID(element.patient)
            .then(user=>{
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'zzkhoizz123@gmail.com',
                  pass: server_config.EMAIL_PASS
                }                  
              });
              
              var mailOptions = {
                from: '"Contact HPLBooking" <zzkhoizz123@gmail.com>',
                to: user.email,
                subject: 'Lịch khám bệnh từ HplBooking',
                text: 'Bạn có lịch khám bệnh vào lúc ' + moment(element.startTime).format('LLLL') 
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log("Error tại đây");
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            })
            .catch(err=>{
              console.log("Error occur here");
              console.log(err);
            })
        });
      })
      .catch(err=>{
        console.log(err);
    })
  });
}


const server = () =>
  new Promise((resolve, reject) => {
    setTimer();
    console.log("Starting Server");
    const s = app.listen(server_config.PORT, err => {
      if (err) {
        reject(err);
      } else {
        gracefulShutdown(s);
        resolve(s);
      }
    });
  });


module.exports = server;
