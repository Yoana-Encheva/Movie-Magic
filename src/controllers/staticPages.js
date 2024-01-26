const router = require("express").Router();

router.get("/", async (req, res) => {
  const movies = await Promise.resolve([]);
  res.render("home", { movies });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/search", (req, res) => {
  res.render("search");
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
