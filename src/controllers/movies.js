const router = require("express").Router();

router.get("/movies/create", async (req, res) => {
  res.render("create");
});

router.get("/movies/details/:id", async (req, res) => {
  res.render("details");
});

module.exports = router;
