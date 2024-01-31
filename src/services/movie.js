const Movie = require("../models/Movie");

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId);

exports.create = (movie) => Movie.create(movie);

exports.attach = async (movieId, castId) => {
  // TODO: validate castId if exists
  // TODO: validate if cast is already added

  return await Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
};

exports.search = async (title, genre, year) => {
  let result = await Movie.find().lean();

  if (title) {
    result = result.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (genre) {
    result = result.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (year) {
    result = result.filter((movie) => movie.year === year);
  }

  return result;
};
