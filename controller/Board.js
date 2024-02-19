const { Board } = require("../models");
const { Op } = require("sequelize");
const { User } = require("../models");
const jwt = require("../utils/jwt");
const { sequelize, QueryTypes } = require("../models");
//const multer = require("multer");

// const storage = multer.diskStorage({//디스크 저장소의 정의
//   destination: function(req, file, cb){
//       cb(null, 'uploads/')    //파일이 저장될 위치 정의하기
//   },
//   filename: function(req, file, cb){  //파일명 지정하기
//       //cb(null, file.originalname) //cb 콜백함수를 통해 전송된 파일 이름 설정
//       cb(null, new Date().valueOf() + path.extname(file.originalname)); //시스템 시간으로 파일 이름 설정
//   }
// })

module.exports = {
  Post: async (req, res) => {
    try {
      let { title } = req.body;
      console.log(req.files);
      let { content } = req.body;
      let { xauth } = req.headers;
      console.log("xaut : ", xauth);

      let decoded = jwt.verifyToken(xauth);

      let image = "/img/" + req.files.image[0].fileName;

      const rows = await Board.create({
        title: title,
        content: content,
        image: image,
        id: decoded.id,
      });

      if (rows) return res.status(200).json({ result: rows });
    } catch (err) {
      console.log(err);
    }
  },

  Delete: async (req, res) => {
    try {
      let { xauth } = req.headers;

      let decoded = jwt.verifyToken(xauth);

      const rows = await Board.destroy({
        where: { id: decoded.id },
      });

      if (rows) return res.status(200).json({ result: rows });
      else {
        res.send(0);
      }
    } catch (err) {
      console.log(err);
    }
  },

  Get: async (req, res) => {
    try {
      const rows = await Board.findAll();

      if (rows) return res.status(200).json({ result: rows });
    } catch (err) {
      console.log(err);
    }
  },

  Search: async (req, res) => {
    try {
      const rows = await Board.findAndCountAll({
        attribute: ["title", "content"],
        where: {
          title: {
            [Op.like]: "%" + req.body.title + "%",
          },
        },
        where: {
          content: {
            [Op.like]: "%" + req.body.content + "%",
          },
        },
      });

      if (rows) return res.status(200).json({ result: rows });
      else {
        res.send(0);
      }
    } catch (err) {
      console.log(err);
    }
  },

  Update: async (req, res) => {
    try {
      let { xauth } = req.headers;

      let decoded = jwt.verifyToken(xauth);

      let { n_title, n_content } = req.body;

      const rows = await Board.update(
        {
          title: n_title,
          content: n_content,
        },
        {
          where: {
            id: decoded.id,
          },
        }
      );

      if (rows) return res.status(200).json({ result: rows });
      else {
        res.send(0);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
