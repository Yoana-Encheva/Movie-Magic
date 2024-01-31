const router = require("express").Router();

const staticPagesController = require("./controllers/staticPages");
const moviesController = require("./controllers/movie");
const castController = require("./controllers/cast");

router.use(staticPagesController);
router.use(moviesController);
router.use("/cast", castController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
