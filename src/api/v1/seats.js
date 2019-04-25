const Router = require("express");
const moment = require("moment");

const UserModel = require("./../../model/UserModel");
const SeatModel = require("./../../model/SeatModel");

const shiftConvert = require("./../../utils/ShiftConvert");

const ObjectId = require("mongodb").ObjectID;

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
    const id = new ObjectId("000d9f7a65ddd10ea830b293");
    lst = [id];

    SeatModel.CreateSeatWithTime(convert.startDate, convert.endDate, department, userId, lst)
      .then(result => {
        res.status(200);
        return res.json({
          message: "Success create seat",
          success: true,
          error: 0,
          data: result
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

  router.get("/all_seat", (req, res, next) => {
    SeatModel.GetAllSeatByUserID(req.user.id)
      .then(data => {
        res.status(200);
        res.json({
          message: "get all seat success",
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
      });
  });


  router.delete("/:id", (req, res, next) => {
    const seatid = req.params.id;
    const userid = req.user.id;

    SeatModel.DeleteSeatByID(seatid, userid)
      .then(data => {
        res.status(200);
        res.json({
          message: "Delete seat success",
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
      });
  });

module.exports = router;