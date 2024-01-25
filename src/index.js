const express = require("express");
const router = require("express").Router();

const configExpress = require("./config/configExpress");
const configHandlebars = require("./config/configHandlebars");

const app = express();
const port = 3000;

configExpress(app);
configHandlebars(app);

router.get("/", async (req, res) => {
  res.render("home");
});

app.use(router);

app.listen(port, () => console.log(`Express running on port:  ${port}...`));
