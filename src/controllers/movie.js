const router = require("express").Router();

const movieService = require("../services/movie");
const castService = require("../services/cast");
const { isAuth } = require("../middlewares/auth");
const { extractErrorMessages, formatErrors } = require("../utils/errors");

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
    errors = extractErrorMessages(err);
    res.render("movie/create", { ...req.body, errors: formatErrors(errors) });
  }
});

router.get("/:movieId", async (req, res) => {
  try {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const isOwner = movie.owner == req.user?._id;
    res.render("movie/details", { movie, isOwner });
  } catch (err) {
    res.redirect(`/404`);
  }
});

router.get("/:movieId/attach", isAuth, async (req, res) => {
  try {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAll().lean();

    res.render("movie/cast-attach", { ...movie, casts });
  } catch (err) {
    res.redirect(`/404`);
  }
});

router.post("/:movieId/attach", isAuth, async (req, res) => {
  const movieId = req.params.movieId;
  const castId = req.body.cast;

  try {
    await movieService.attach(movieId, castId);
    res.redirect(`/movies/${movieId}/attach`);
  } catch (err) {
    res.render(`404`, {
      errors: "Something went wrong, try again later",
    });
  }
});

router.get("/:movieId/edit", isAuth, async (req, res) => {
  try {
    const movie = await movieService.getOne(req.params.movieId).lean();
    res.render("movie/edit", { ...movie });
  } catch (err) {
    res.redirect(`/404`);
  }
});

router.post("/:movieId/edit", isAuth, async (req, res) => {
  const movieId = req.params.movieId;
  try {
    await movieService.edit(movieId, req.body);
    res.redirect(`/movies/${movieId}`);
  } catch (err) {
    res.render(`404`, {
      errors: "Something went wrong, try again later",
    });
  }
});

router.get("/:movieId/delete", isAuth, async (req, res) => {
  try {
    await movieService.delete(req.params.movieId);
    res.redirect("/");
  } catch (err) {
    res.render(`404`, {
      errors: "Something went wrong, try again later",
    });
  }
});

module.exports = router;
