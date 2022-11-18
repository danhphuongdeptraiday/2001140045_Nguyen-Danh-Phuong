const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

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
