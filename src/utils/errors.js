const { MongooseError } = require("mongoose");

function extractErrorMessages(err) {
  let errorMessages = [];

  if (err instanceof MongooseError) {
    errorMessages =
      [err.message] ||
      Object.values(err.errors).map((e) => e.properties?.message);
  } else if (err instanceof Error) {
    errorMessages = [err.message];
  }

  return errorMessages;
}

function formatErrors(errors) {
  return errors.join("\n");
}

module.exports = { extractErrorMessages, formatErrors };
