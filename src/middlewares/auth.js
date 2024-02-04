const jwt = require("../lib/jwt");
const { SECRET } = require("../config/config");

exports.auth = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (!token) {
    return next();
  }

  try {
    req.user = await jwt.verify(token, SECRET);
    next();
  } catch {
    res.clearCookie("auth");
    res.redirect("/user/login");
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/user/login");
  }

  next();
};
