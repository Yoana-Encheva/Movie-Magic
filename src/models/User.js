const { Schema, model, MongooseError } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.virtual("rePassword").set(function (value) {
  if (value !== this.password) {
    throw new MongooseError("Password missmatch!");
  }
});

const User = model("User", userSchema);

module.exports = User;
