const Cast = require("../models/Cast");

exports.getAll = () => Cast.find();
exports.create = (cast) => Cast.create(cast);
