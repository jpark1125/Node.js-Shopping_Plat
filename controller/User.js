const { Users, sequelize, Userinfo } = require("../models");
const jwt = require("../utils/jwt");
const { createRefreshToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
require("dotenv").config();
const secretKey = "" + process.env.YOURREFRESHKEY;

module.exports = {
  Signup: async (req, res) => {
    try {
      let { name, email, id, passwd } = req.body;

      const salt = bcrypt.genSaltSync(8);
      const hash = await bcrypt.hash(passwd, salt);
      const beforeId = shortid.generate();

      let token = jwt.createToken({
        id: beforeId,
      });
      let rtoken = jwt.createRefreshToken({
        id: beforeId,
      });

      const tx = await sequelize.transaction();

      console.log("asdasdasd");

      const rows = await Users.create(
        // 이부분이 에러인데 이거 모델 파일 문제인건가?
        {
          idx: beforeId,
          name: name,
          email: email,
          id: id,
          passwd: hash,
          refreshtoken: rtoken,
        },
        {
          transaction: tx,
        }
      );

      await tx.commit();

      return res.status(200).json({
        result: "success",
        resuelt: rows,
        xauth: token,
        rxauth: rtoken,
      });
    } catch (err) {
      console.log(err);
    }
  },

  Login: async (req, res) => {
    try {
      const { id, passwd } = req.body;
      let token;
      let rtoken;

      const rows = await Users.findOne({
        where: { id: id },
      });

      const compare = await bcrypt.compare(passwd, rows.passwd);

      if (compare == true) {
        token = jwt.createToken({
          user_id: rows.id,
          id: rows.id,
        });
        rtoken = createRefreshToken({ id: rows.id });

        await Users.update(
          {
            refreshtoken: rtoken,
          },
          {
            where: {
              id: rows.id,
            },
          }
        );

        return res.status(200).json({ token: token, rtoken: rtoken });
      } else throw { code: 9 };
    } catch (err) {
      console.log(err);
    }
  },

  IssueToken: async (req, res) => {
    try {
      let { rxauth } = req.headers;

      const issueId = jwt.verifyRefreshToken(rxauth);

      const isTrue = await Users.findOne({
        where: {
          id: issueId.user_id,
          refreshtoken: rxauth,
        },
      });

      if (isTrue) {
        let token = jwt.createToken({
          id: isTrue.id,
        });

        return res.status(200).json({ xauth: token });
      } else {
        res.status(200).json({ result: "failed" });
      }
    } catch (err) {
      console.log(err);
    }
  },

  List: async (req, res) => {
    try {
      const rows = await Users.findAll();

      if (rows) return res.status(200).json({ result: rows });
      else throw console.log(error);
    } catch (err) {
      console.log(err);
    }
  },

  Checkemail: async (req, res) => {
    try {
      const data = await Users.findOne({ where: { email: req.body.email } });

      if (data) {
        res.status(400).json({
          result: false,
          message: "이미 존재하는 이메일입니다.",
        });
        if (rows) return res.status(200).json({ result: rows });
      } else {
        res.send(200);
      }
    } catch (err) {
      console.log(err);
    }
  },

  Checkid: async (req, res) => {
    try {
      const data = await Users.findOne({ where: { id: req.body.id } });

      if (data) {
        res.status(400).json({
          result: false,
          message: "이미 존재하는 아이디입니다.",
        });
        if (rows) return res.status(200).json({ result: rows });
      } else {
        res.send(200);
      }
    } catch (err) {
      console.log(err);
    }
  },

  TokenCh: async (req, res) => {
    try {
      let auth = req.get("x_auth");

      const token = authorization(" ", " ")[1];
      jwt.verify(token, secretKey, (err, encode) => {
        if (err) console.error(err);
        else {
          console.log(encode);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};
