const Cast = require("../models/Cast");

exports.getAll = () => Cast.find();

exports.create = (cast) => Cast.create(cast);

exports.getByIds = (castIds) => Cast.find({ _id: { $in: castIds } });
