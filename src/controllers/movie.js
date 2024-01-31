const router = require("express").Router();
const movieService = require("../services/movie");

router.get("/movies/create", (req, res) => {
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
  const movie = await movieService.getOne(req.params.movieId).lean();
  res.render("details", { movie });
});

router.get("/movies/:movieId/attach", async (req, res) => {
  const movie = await movieService.getOne(req.params.movieId).lean();
  res.render("movie/cast-attach", { ...movie });
});

module.exports = router;
