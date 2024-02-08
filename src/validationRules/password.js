const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

module.exports = {
  validate(value) {
    return regex.test(value);
  },
  message:
    "Password should be at least 6 characters long containing at least one english letter and number",
};
