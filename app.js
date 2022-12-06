const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const multer = require("multer");
const { json } = require("body-parser");
// require("dotenv").config();
const app = express();
const port = 3000;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));
app.use(multer().none());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("client"));

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
app.get("/api/all/courses", async (req, res) => {
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

app.get("/abc", async (req, res) => {
  let db = await getDBconnection();
  let selectUsername = "Select UserName from User";
  let listUserName = await db.all(selectUsername);
  res.send("hello");
});

app.get("/api/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/html/login.html"));
});

app.get("/api/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/html/register.html"));
});

app.post("/api/register", async (req, res) => {
  let db = await getDBconnection();
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  // Check username
  let checkUserName = true;
  let selectUsername = "Select UserName from User";
  let listUserName = await db.all(selectUsername);
  for (let i = 0; i < listUserName.length; i++) {
    if (username === listUserName[i].UserName) {
      // errors.push("Username existed, try another one");
      res.json({
        userName: username,
        errUser: "Username existed, try another one",
      });
      checkUserName = false;
      return;
    }
  }

  // Check password
  let checkPassword = true;
  if (password === "") {
    // errors.push("Your password is empty");
    res.json({
      errPassword: "Your password is empty",
    });
    checkPassword = false;
    return;
  }
  if (checkUserName == false || checkPassword == false || !password) {
    errors.push("Username or password is not valid. Please check again !!!");
    return;
  } else {
    let insertData = "insert into User ( UserName, Password) values ( ?, ?)";
    db.run(insertData, [username, password], (err) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }
      console.log("Insert success");
    });
  }
  res.json({
    message: "success",
    userData: {
      username: username,
      password: password,
    },
  });
  db.close();
});

app.get("/api/login", (req, res) => {
  res.sendFile();
});

app.get("/api/announcement", (req, res) => {
  const titleAnnouncement = {
    ann1: "Is the LMS salary committed to working in the international world.",
    ann2: "Students have graduated and gone out into the world from LMS.",
    ann3: "Students are studying and working in 12 countries around the world.",
    ann4: "Is the average salary received by students after 1.5 - 3 years of graduating from LMS.",
  };

  res.json(JSON.stringify(titleAnnouncement));
  // res.render("announcement", titleAnnouncement);
  // .json(JSON.stringify(titleAnnouncement));
});

app.listen(port, () => console.log(`Listening on ${port} `));
