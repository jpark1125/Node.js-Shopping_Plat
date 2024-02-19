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
const redisClient = require("./middleware/redis");
const port = process.env.PORT || 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결");
  })
  .catch((err) => {
    console.log(err);
  });

// 레디스 연결
app.get("/redis", async (req, res) => {
  try {
    await redisClient.connect(); // redis 연결
    await redisClient.set("test", "Redis is connected!");
    const value = await redisClient.get("test");
    await redisClient.quit();
    res.send(value);
  } catch (error) {
    console.error("Redis 연결 테스트 실패:", error);
    res.status(500).send("Redis 연결 테스트 실패");
  }
});

app.use(express.json());
app.use(cors());
app.use(compression()); // 서버에서 데이터를 압축해주는거
app.use(helmet()); // helmet은 개발환경에서는 필요없는 모듈이니 배포환경에서만 활성

app.use("/user", Router.UserRoute);
app.use("/board", Router.BoardRoute);

//app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(port, () => {
  console.log(`${port}번 포트에서 대기 중`);
});
