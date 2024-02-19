const express = require("express");
//const { createToken, creatRefreshToken } = require("../utils/jwt");
const { UserController: controller } = require("../controller");

// 인증 확인을 위한 미들웨어를 가져옵니다.
const { Check } = require("../utils/isAuth");

// router.post("/register", controller.Signup);

// 인증 확인을 위한 미들웨어입니다. 현재는 주석 처리되어 있습니다.
//const { checkToken } = require("../middleware/isAuth");

// jwt 모듈입니다. 토큰을 생성하거나 검증하는 등의 작업에 사용됩니다. 현재는 주석 처리되어 있습니다.
//const jwt = require("jsonwebtoken");

// JWT 인증 미들웨어입니다. 현재는 주석 처리되어 있습니다.
//const { authUtil } = require("../middleware/authJWT");

// express의 Router 인스턴스를 생성합니다.
const router = express.Router();

router.post("/signup", controller.Signup);
router.post("/login", controller.Login);
router.post("/emailcheck", controller.Checkemail);
router.post("/idcheck", controller.Checkid);
router.get("/list", controller.List);
router.post("/token", controller.IssueToken);

module.exports = router;
