const router = require("express").Router();

const staticPagesController = require("./controllers/staticPages");
const moviesController = require("./controllers/movies");

router.use(staticPagesController);
router.use(moviesController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
