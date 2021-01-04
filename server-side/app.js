require("./config/config");
require("./models/db-config");
require("./config/passport-config");

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const routerIndex = require("./routing/index.router");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/api", routerIndex);

app.listen(port, () => console.log("Server is running on port " + port));

app.use((error, req, res, next) => {
  errors = [];
  if (error.name === "ValidationError") {
    Object.keys(error.errors).forEach((err) => {
      errors.push(error.errors[err].message);
    });
    res.status(422).send(errors);
  }
});
