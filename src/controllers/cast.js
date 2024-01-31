const router = require("express").Router();

router.get("/create", async (req, res) => {
  res.render("cast/create");
});

router.post("/create", async (req, res) => {
  const body = req.body;

  console.log(body);
  res.redirect("/");
});

module.exports = router;
