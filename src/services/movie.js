const Movie = require("../models/Movie");

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId).populate("casts");

exports.create = (movie) => Movie.create(movie);

exports.edit = (movieId, movieData) =>
  Movie.findByIdAndUpdate(movieId, movieData);

exports.attach = async (movieId, castId) => {
  // TODO: validate castId if exists
  // TODO: validate if cast is already added

  return await Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
};

exports.search = (title, genre, year) => {
  let query = {};

  if (title) {
    query.title = new RegExp(title, "i");
  }

  if (genre) {
    query.genre = genre.toLowerCase();
  }

  if (year) {
    query.year = year;
  }

  return Movie.find(query);
};

exports.delete = (movieId) => Movie.findByIdAndDelete(movieId);
