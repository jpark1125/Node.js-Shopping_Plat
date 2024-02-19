const redis = require("redis");
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  //password:
});

redisClient.on("connect", () => {
  console.log("Redis 클라이언트가 서버에 연결되었습니다.");
});

redisClient.on("error", (err) => {
  console.log("Redis 클라이언트 연결 에러", err);
});

module.exports = redisClient;
