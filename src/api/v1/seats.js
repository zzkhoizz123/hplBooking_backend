const Router = require("express");
const moment = require("moment");

const UserModel = require("./../../model/UserModel");
const SeatModel = require("./../../model/SeatModel");

const shiftConvert = require("./../../utils/ShiftConvert");

const router = Router();


router.post("/", (req, res, next) => {
    const userId = req.user.id;
    const date = req.body.date;
    const shift = req.body.shift;
    const department = req.body.department;

    // console.log(userId);
    // console.log(date);
    // console.log(shift);

    const convert = shiftConvert(date, shift);
    console.log(convert.startDate);
    console.log(convert.endDate);
  
    SeatModel.CreateSeatWithTime(convert.startDate, convert.endDate, department, userId)
      .then(result => {
        res.status(200);
        return res.json({
          message: "Success create seat",
          success: true,
          error: 0,
          data: {}
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

module.exports = router;