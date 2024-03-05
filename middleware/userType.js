const isSeller = (req, res, next) => {
  // 토큰에서 userType을 추출
  const userType = req.user.userType;

  if (userType === "seller") {
    return next(); // 판매자에게만 다음 미들웨어로 넘어갑니다.
  } else {
    return res
      .status(403)
      .json({ message: "This action is only allowed for sellers." });
  }
};

const isBuyer = (req, res, next) => {
  //넥스트 함수 찾아보자
  const userType = req.user.userType;

  if (userType === "buyer") {
    return next(); // 구매자에게만 다음 미들웨어로 넘어갑니다.
  } else {
    return res
      .status(403)
      .json({ message: "This action is only allowed for buyers." });
  }
};
module.exports = { isSeller, isBuyer };
