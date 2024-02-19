const jwt = require("./jwts");

const authUtil = {
  checkToken: async (req, res, next) => {
    var token = req.headers.token;
    if (!token) return res.json(util.fail(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN));
    const user = await jwt.verify(token);
    if (user === TOKEN_EXPIRED)
      return res.json(util.fail(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
    if (user === TOKEN_INVALID)
      return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
    if (user.idx === undefined)
      return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
    req.idx = user.idx;
    next();
  },
};

module.exports = authUtil;
