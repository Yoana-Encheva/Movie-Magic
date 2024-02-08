const router = require("express").Router();

const authService = require("../services/auth");

const { extractErrorMessages, formatErrors } = require("../utils/errors");
const emailRules = require("../validationRules/email");
const passwordRules = require("../validationRules/password");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  let errors = [];
  const { email, password, rePassword } = req.body;

  if (!emailRules.validate(email)) {
    errors.push(emailRules.message);
  }

  if (!passwordRules.validate(password)) {
    errors.push(passwordRules.message);
  }

  if (password !== rePassword) {
    errors.push("Passwords should match");
  }

  if (errors.length) {
    return res.render("auth/register", {
      email,
      password,
      errors: formatErrors(errors),
    });
  }

  try {
    await authService.register(req.body);
    res.redirect("/user/login");
  } catch (err) {
    errors = extractErrorMessages(err);

    return res.render("auth/register", {
      email,
      password,
      errors: formatErrors(errors),
    });
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);

    res.cookie("auth", token);
    res.redirect("/");
  } catch (err) {
    res.status(400).render("auth/login", { errors: extractErrorMessages(err) });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
