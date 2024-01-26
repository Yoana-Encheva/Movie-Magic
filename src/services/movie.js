const movies = [
  {
    _id: 1,
    title: "Jungle Cuise",
    genre: "Adventure",
    director: "Spilberg",
    year: "2019",
    imageUrl: "/img/jungle-cruise.jpeg",
    rating: "5",
    description:
      "Dreaming about saving countless lives and having another adventure, the feisty English feminist and doctor of botany, Dr Lily Houghton, embarks on a peril-laden mission to change the world. Along with her fashionable brother, MacGregor, Dr Houghton enlists the help of the arrogant, wisecracking riverboat skipper, Captain Frank Wolff, to guide them through the serpentine Amazon River in La Quila, his swift wooden boat. Now, as the intrepid trio ventures deeper and deeper into the heart of an impenetrable green maze, searching for something that cannot be found, a centuries-old curse and the ruthless aristocrat, Prince Joachim, threaten to put an end to their ambitious plans.",
  },
  {
    _id: 2,
    title: "The Little Mermaid",
    genre: "Adventure",
    director: "Fantasy",
    year: "2019",
    imageUrl: "/img/the-little-mermaid.jpg",
    rating: "5",
    description:
      "The youngest of King Triton's daughters, Ariel is a beautiful and spirited young mermaid with a thirst for adventure. Longing to find out more about the world beyond the sea, Ariel visits the surface and falls for the dashing Prince Eric. Following her heart, she makes a deal with the evil sea witch, Ursula, to experience life on land.",
  },
  {
    _id: 3,
    title: "THome-Alone",
    genre: "Adventure",
    director: "Comedy",
    year: "2019",
    imageUrl: "/img/home-alone.jpeg",
    rating: "5",
    description:
      "It is Christmas time and the McCallister family is preparing for a vacation in Paris.",
  },
];

exports.getAll = () => {
  return [...movies] || [];
};

exports.getOne = (movieId) => {
  const movie = movies.find((movie) => movie._id == movieId);
  return movie || {};
};

exports.create = (movie) => {
  movie._id = movies[movies.length - 1]._id + 1;
  movies.push(movie);
};

exports.search = (title, genre, year) => {
  let result = [...movies];

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
