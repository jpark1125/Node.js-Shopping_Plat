const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const { Users } = require("./models");
const { sequelize } = require("./models");
const Router = require("./routes");
const db = require("./models");
const redisClient = require("../middleware/redis");
const port = process.env.PORT || 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use(compression()); // 서버에서 데이터를 압축해주는거
app.use(helmet()); // helmet은 개발환경에서는 필요없는 모듈이니 배포환경에서만 활성

app.use("/user", Router.UserRoute);

//app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(port, () => {
  console.log(`${port}번 포트에서 대기 중`);
});
