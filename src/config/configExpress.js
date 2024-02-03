const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const { auth } = require("../middlewares/auth");

function configExpress(app) {
  app.use(express.static(path.resolve("src/public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(auth);

  return app;
}

module.exports = configExpress;
