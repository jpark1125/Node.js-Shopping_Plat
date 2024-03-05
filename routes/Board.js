const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { BoardController: controller } = require("../controller");

const router = express.Router();
const { isSeller, isBuyer } = require("../middleware/userType");

router.post(
  "/post",
  isSeller,
  upload.fields([{ name: "image" }]),
  controller.Post
);
router.post("/delete", isSeller, controller.Delete);
router.post("/update", isSeller, controller.Update);
router.get("/get", controller.Get);
//router.post("/updatecontent", controller.Updatcontent);
//router.post("/updatetitle", controller.Updatetitle);
//router.post("/deleteimage", controller.Deleteimage);
router.post("/search", controller.Search);

//("/cart",isBuyer, controller.Cart); 장바구니담기
//("/cartget", isBuyer, controller.Cartget); 장바구니 조회
//("cartdelete", isBuyer, controller.Cartdelete); 장바구니 삭제

module.exports = router;
