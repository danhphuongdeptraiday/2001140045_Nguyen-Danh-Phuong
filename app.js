const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const multer = require("multer");
// require("dotenv").config();
const app = express();
const port = 3000;

app.use(cors());
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );

// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));
app.use(multer().none());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static("public"));

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
  // console.log(db);
  return db;
}
app.get("/home", async (req, res) => {
  try {
    let db = await getDBconnection();
    // await db.run(' Course where courseName like "Python"');
    let s = await db.all("Select * from Course");
    console.log(s);
    db.close();
  } catch (err) {
    console.log(err);
  }

  res.send("Succgess!!");
});

// const db = require("knex")({
//   client: "sqlite3",
//   connect: {
//     filename: "server/data.db",
//   },
//   useNullAsDefault: true,
// });

// console.log(db("User").select("*"));

app.post("/api/register", async (req, res) => {
  let db = await getDBconnection();

  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.send("Fill full input");
  } else {
    res.send("success");
    let insertData = "insert into User ( UserName, Password) values ( ?, ?)";
    await db.run(insertData, [username, password]);
    console.log("Insert success");
  }
  db.close();
});

app.get("/api/announcement", (req, res) => {
  const titleAnnouncement = {
    ann1: "Is the LMS salary committed to working in the international world.",
    ann2: "Students have graduated and gone out into the world from LMS.",
    ann3: "Students are studying and working in 12 countries around the world.",
    ann4: "Is the average salary received by students after 1.5 - 3 years of graduating from LMS.",
  };

  res.json(JSON.stringify(titleAnnouncement));
});

app.listen(port, () => console.log(`Listening on ${port} `));
