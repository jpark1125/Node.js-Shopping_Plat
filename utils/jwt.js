const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

module.exports = {
  createToken: (payload) => {
    console.log(ACCESS_TOKEN_SECRET);

    const token = jwt.sign(
      {
        user_id: payload.user_id,
        id: payload.id,
      },
      ACCESS_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "10m",
      }
    );
    return token;
  },
  verifyToken: (token) => {
    if (!token) {
      return "";
    }
    let decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return decoded;
  },
  createRefreshToken: (payload) => {
    const retoken = jwt.sign({ user_id: payload.id }, REFRESH_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    return retoken;
  },
  verifyRefreshToken: (token) => {
    if (!token) {
      return "";
    }
    let decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    return decoded;
  },
};
