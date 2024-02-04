const router = require("express").Router();

const movieService = require("../services/movie");
const castService = require("../services/cast");
const { isAuth } = require("../middlewares/auth");

router.get("/create", isAuth, (req, res) => {
  res.render("movie/create");
});

router.post("/create", isAuth, async (req, res) => {
  const newMovie = {
    ...req.body,
    owner: req.user._id,
  };

  try {
    await movieService.create(newMovie);
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    res.redirect("/movies/create");
  }
});

router.get("/:movieId", async (req, res) => {
  const movie = await movieService.getOne(req.params.movieId).lean();
  const isOwner = movie.owner == req.user?._id;
  res.render("movie/details", { movie, isOwner });
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

router.post("/:movieId/edit", isAuth, async (req, res) => {
  const movieId = req.params.movieId;
  await movieService.edit(movieId, req.body);
  res.redirect(`/movies/${movieId}`);
});

router.get("/:movieId/delete", isAuth, async (req, res) => {
  await movieService.delete(req.params.movieId);
  res.redirect("/");
});

module.exports = router;
