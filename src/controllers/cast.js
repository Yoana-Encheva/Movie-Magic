const router = require("express").Router();

const castService = require("../services/cast");

router.get("/create", (req, res) => {
  res.render("cast/create");
});

router.post("/create", async (req, res) => {
  await castService.create(req.body);
  res.redirect("/");
});

module.exports = router;
