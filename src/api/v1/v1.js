const Router = require("express");

const user = require("./users");
const seat = require("./seats");

const router = Router();

router.use("/users", user);
router.use("/seats", seat);

module.exports = router;