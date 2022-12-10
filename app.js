const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const multer = require("multer");
const { json } = require("body-parser");
const cookieParser = require("cookie-parser");
// require("dotenv").config();
const app = express();
const port = 3000;
app.use(cookieParser());
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

app.get("/api/announcement", (req, res) => {
  const titleAnnouncement = {
    ann1: "Is the LMS salary committed to working in the international world.",
    ann2: "Students have graduated and gone out into the world from LMS.",
    ann3: "Students are studying and working in 12 countries around the world.",
    ann4: "Is the average salary received by students after 1.5 - 3 years of graduating from LMS.",
  };

  res.json(JSON.stringify(titleAnnouncement));
});

// My Course
app.get("/api/my/courses", async (req, res) => {
  console.log(req.cookies);
  try {
    let db = await getDBconnection();
    if (req.cookies) {
      let s = await db.all(
        "select * from Course where courseId in (select courseId from enrollment where userId = (select UserId from User where UserName = ?))",
        req.cookies.username
      );
      console.log(s);
      if (s) {
        res.json(s);
        console.log(s);
      }
    }
    await db.close();
  } catch (err) {
    console.log(err);
  }
});

// allCourse
app.get("/api/all/courses", async (req, res) => {
  console.log(req.cookies);
  try {
    let db = await getDBconnection();
    if (req.cookies) {
      let s = await db.all(
        "select * from Course where courseId not in (select courseId from enrollment where userId = (select UserId from User where UserName = ?))",
        req.cookies.username
      );
      res.json(s);
    }

    db.close();
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/enroll/:username/:courseid", async (req, res) => {
  console.log(req.params);
  let db = await getDBconnection();
  if (req.cookies.username) {
    let userId = await db.get(
      "select userid from user where username = ?",
      req.params.username
    );
    console.log(userId);
    let insertSQL = "insert into enrollment (UserId, CourseId) values (?,?)";
    await db.run(insertSQL, [userId.UserId, req.params.courseid]);
  }
  res.json({
    username: req.params.username,
    courseid: req.params.courseid,
  });
});

// Login
app.get("/api/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/html/login.html"));
});

app.post("/api/login", async (req, res) => {
  let db = await getDBconnection();
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  if (username === "" || password === "") {
    res.json({
      errMessage: "Username and password have to be required",
    });
  }

  let s =
    "Select UserId, UserName from User where UserName = ? and Password = ?";
  let a = await db.all(s, [username, password]);
  console.log(a);
  if (a.length < 1) {
    res.json({
      message: "Wrong username or password",
    });
    return;
  } else {
    console.log(a[0].UserId);
    res.cookie("username", a[0].UserName, {
      expires: new Date("2023-01-01"),
    });
    res.send(true);
    console.log("success");
  }

  db.close();
});

// Register
app.get("/api/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/html/register.html"));
});

app.get("/api/home", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/html/home.html"));
});

app.post("/api/register", async (req, res) => {
  let db = await getDBconnection();
  console.log("register: " + JSON.stringify(req.body));
  let username = req.body.username;
  let password = req.body.password;
  // Check username
  let checkUserName = true;
  let selectUsername = "Select UserName from User";
  let listUserName = await db.all(selectUsername);
  for (let i = 0; i < listUserName.length; i++) {
    if (username === listUserName[i].UserName) {
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

app.get("/abc", async (req, res) => {
  let db = await getDBconnection();
  let s = await db.all(
    "select * from Course where courseId not in (select courseId from enrollment where userId = 1)"
  );
  res.send(s);
  console.log(s);
});

app.listen(port, () => console.log(`Listening on ${port} `));
