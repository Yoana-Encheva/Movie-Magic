const router = require("express").Router();

const castService = require("../services/cast");
const { isAuth } = require("../middlewares/auth");
const { extractErrorMessages, formatErrors } = require("../utils/errors");

router.get("/create", isAuth, (req, res) => {
  res.render("cast/create");
});

router.post("/create", isAuth, async (req, res) => {
  try {
    await castService.create(req.body);
    res.redirect("/");
  } catch (err) {
    errors = extractErrorMessages(err);
    res.render("cast/create", { ...req.body, errors: formatErrors(errors) });
  }
});

module.exports = router;
