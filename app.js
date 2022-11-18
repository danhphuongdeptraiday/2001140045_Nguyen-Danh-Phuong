const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(express.static("public"));

app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

app.get("/api/announcement", (req, res) => {
  res.render("index");
});

app.listen(port, () => console.log(`Listening on ${port} `));
