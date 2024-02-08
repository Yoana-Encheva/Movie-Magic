const { Schema, model, MongooseError } = require("mongoose");
const bcrypt = require("bcrypt");
const emailRules = require("../validationRules/email");
const passwordRules = require("../validationRules/password");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [emailRules.validate, emailRules.message],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    validate: [passwordRules.validate, passwordRules.message],
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
