const router = require("express").Router();

const authController = require("./controllers/auth");
const staticPagesController = require("./controllers/staticPages");
const moviesController = require("./controllers/movie");
const castController = require("./controllers/cast");

router.use(staticPagesController);
router.use("/movies", moviesController);
router.use("/user", authController);
router.use("/cast", castController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
