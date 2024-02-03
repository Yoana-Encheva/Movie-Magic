const router = require("express").Router();

const movieService = require("../services/movie");
const castService = require("../services/cast");

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
  const casts = await castService.getAll().lean();
  res.render("movie/cast-attach", { ...movie, casts });
});

router.post("/movies/:movieId/attach", async (req, res) => {
  const movieId = req.params.movieId;
  const castId = req.body.cast;

  await movieService.attach(movieId, castId);
  res.redirect(`/movies/${movieId}/attach`);
});

router.get("/movies/:movieId/edit", async (req, res) => {
  const movie = await movieService.getOne(req.params.movieId).lean();
  res.render("movie/edit", { ...movie });
});

module.exports = router;
