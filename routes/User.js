const express = require("express");
const { UserController: controller } = require("../controller");

//const { Check } = require("../utils/isAuth");

const router = express.Router();

router.post("/signup", controller.Signup);
router.post("/login", controller.Login);
router.post("/emailcheck", controller.Checkemail);
router.post("/idcheck", controller.Checkid);
router.get("/list", controller.List);
router.post("/token", controller.IssueToken);

module.exports = router;
