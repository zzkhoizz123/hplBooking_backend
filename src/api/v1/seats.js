const Router = require("express");
const moment = require("moment");

const UserModel = require("./../../model/UserModel");
const SeatModel = require("./../../model/SeatModel");

const shiftConvert = require("./../../utils/ShiftConvert");
const departmentConvert = require("./../../utils/DepartmentConvert");

const ObjectId = require("mongodb").ObjectID;

const router = Router();


router.post("/", (req, res, next) => {
    const userId = req.user.id;
    const date = req.body.date; // "2019-02-19"
    const shift = req.body.shift;
    const department = req.body.department;

    // console.log(userId);

    console.log("Ngày: " + date);
    console.log("Ca: " + shift);
    console.log("PHòng ban: " + department);

    const convert = shiftConvert(date, shift);
    const convertDep = departmentConvert(department);
    console.log("PHòng ban đã convert: " + convertDep);

    console.log("Bắt đầu:" + convert.startDate);
    console.log("Kết thúc" + convert.endDate);
    const id = new ObjectId("00c80d56dc4b545724eefd2c");
    lst = [id];
    console.log(Date.now());
    // if(Date.now() > convert.startDate){
    //   return res.json({
    //     message: "Lỗi ngày rồi má",
    //     success: false,
    //     error: 0,
    //     data : {}
    //   });
    // }

    SeatModel.CreateSeatWithTime(convert.startDate, convert.endDate, convertDep, userId, lst)
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