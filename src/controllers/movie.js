const router = require("express").Router();
const movieService = require("../services/movie");

router.get("/movies/create", async (req, res) => {
  res.render("create");
});

router.post("/movies/create", async (req, res) => {
  movieService.create(req.body);
  res.redirect("/");
});

router.get("/movies/details/:id", async (req, res) => {
  res.render("details");
});

module.exports = router;
