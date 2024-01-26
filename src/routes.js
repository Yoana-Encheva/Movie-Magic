const router = require("express").Router();

const staticPagesController = require("./controllers/staticPages");

router.use(staticPagesController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
