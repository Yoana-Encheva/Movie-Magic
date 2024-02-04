const router = require("express").Router();

const castService = require("../services/cast");
const { isAuth } = require("../middlewares/auth");

router.get("/create", isAuth, (req, res) => {
  res.render("cast/create");
});

router.post("/create", isAuth, async (req, res) => {
  await castService.create(req.body);
  res.redirect("/");
});

module.exports = router;
