const express = require("express");
const mongoose = require("mongoose");

const configExpress = require("./config/configExpress");
const configHandlebars = require("./config/configHandlebars");

const routes = require("./routes");

const app = express();
const port = 3000;

configExpress(app);
configHandlebars(app);

app.use(routes);

mongoose
  .connect(`mongodb://localhost:27017/magic-movies`)
  .then(() => {
    console.log("DB connected");

    app.listen(port, () => console.log(`Express running on port:  ${port}...`));
  })
  .catch((err) => console.log("Can not connect to DB", err));
