const router = require("express").Router();

const movieService = require("../services/movie");
const castService = require("../services/cast");
const { isAuth } = require("../middlewares/auth");

router.get("/:movieId", async (req, res) => {
  const movie = await movieService.getOne(req.params.movieId).lean();
  res.render("movie/details", { movie });
});

router.get("/create", isAuth, (req, res) => {
  res.render("movie/create");
});

router.post("/create", isAuth, async (req, res) => {
  try {
    await movieService.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    res.redirect("/movies/create");
  }
});

router.get("/:movieId/attach", isAuth, async (req, res) => {
  const movie = await movieService.getOne(req.params.movieId).lean();
  const casts = await castService.getAll().lean();
  res.render("movie/cast-attach", { ...movie, casts });
});

router.post("/:movieId/attach", isAuth, async (req, res) => {
  const movieId = req.params.movieId;
  const castId = req.body.cast;

  await movieService.attach(movieId, castId);
  res.redirect(`/movies/${movieId}/attach`);
});

router.get("/:movieId/edit", isAuth, async (req, res) => {
  const movie = await movieService.getOne(req.params.movieId).lean();
  res.render("movie/edit", { ...movie });
});

module.exports = router;
