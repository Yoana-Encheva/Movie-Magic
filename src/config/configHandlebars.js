const handlebars = require("express-handlebars");
const path = require("path");

function movieRating(rating) {
  return "&#x2605;".repeat(Number(rating));
}

function configHandlebars(app) {
  app.engine(
    "hbs",
    handlebars.engine({
      extname: "hbs",
      helpers: { movieRating },
    })
  );
  app.set("view engine", "hbs");
  app.set("views", path.resolve("src/views"));

  return app;
}

module.exports = configHandlebars;
