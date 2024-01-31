const router = require("express").Router();

router.get("/create", async (req, res) => {
  res.render("cast/create");
});

module.exports = router;
