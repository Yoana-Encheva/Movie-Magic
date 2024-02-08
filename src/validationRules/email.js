const regex =
  /^[\0-9=?A-Z^_`a-z{|}~](?:\.?[\0-9=?A-Z^_`a-z{|}~])*@[\dA-Za-z](?:-*\.?[\dA-Za-z])*\.[A-Za-z](?:-?[\dA-Za-z])+$/;

module.exports = {
  validate(value) {
    if (!regex.test(value)) {
      return false;
    }

    if (value.length < 10) {
      return false;
    }

    return /^(?!.*__)(?!.*?\.\.)(?!.*--)/g.test(value);
  },

  message: "Enter a valid email address",
};
