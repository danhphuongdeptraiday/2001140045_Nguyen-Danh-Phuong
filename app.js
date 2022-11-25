const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
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

app.get("/api/announcement", cors(), (req, res) => {
  const titleAnnouncement = {
    ann1: "Is the LMS salary committed to working in the international world.",
    ann2: "Students have graduated and gone out into the world from LMS.",
    ann3: "Students are studying and working in 12 countries around the world.",
    ann4: "Is the average salary received by students after 1.5 - 3 years of graduating from LMS.",
  };

  res.json(JSON.stringify(titleAnnouncement));
});

app.listen(port, () => console.log(`Listening on ${port} `));
