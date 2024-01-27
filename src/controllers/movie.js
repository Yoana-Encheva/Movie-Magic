const router = require("express").Router();
const movieService = require("../services/movie");

router.get("/movies/create", async (req, res) => {
  res.render("create");
});

router.post("/movies/create", async (req, res) => {
  try {
    await movieService.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    res.redirect("/create");
  }
});

router.get("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = movieService.getOne(movieId);

  res.render("details", { movie });
});

module.exports = router;
