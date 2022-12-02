const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
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

async function getDBconnection() {
  const db = await sqlite.open({
    filename: "server/data.db",
    driver: sqlite3.Database,
  });
  return db;
}

app.post("/api/register", cors(), async (req, res) => {
  // let db = await getDBconnection();
  // // let insetData =
  // //   'insert into User (UserId, UserName, Password) values (1, "Danh Phuong", "hello123")';
  // let insetData = "Select * from User";
  // let rows = await db.all(insetData);
  // // console.log(JSON.stringify(rows));
  // console.log(rows);
  // res.json(JSON.stringify(rows));
  // // console.log(rows[0].UserName);\
  let out = {};

  try {
    console.log(req.body.name);
    return res.json({
      status: 200,
      success: true,
    });
  } catch (err) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

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
