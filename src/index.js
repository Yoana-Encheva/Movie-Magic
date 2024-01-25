const express = require("express");

const configExpress = require("./config/configExpress");

const app = express();
const port = 3000;

configExpress(app);

app.get("/", (req, res) => {
  res.status(200);
});

app.listen(port, () => console.log(`Express running on port:  ${port}...`));
