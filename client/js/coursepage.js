let d = document.querySelectorAll(".container div");
let courseid;

if (document.cookie.length > 1) {
  // abc = document.cookie.split("=")[1];
  courseid = document.cookie.split(";")[0].split("=")[1];
}

let api = `http://localhost:3000/api/course/${courseid}/quized`;

let userIcon = document.querySelector(".fa-user");
let userContainer = document.querySelector(".user");
let logout = document.querySelector(".logout");
if (document.cookie) {
  userIcon.style.display = "none";
  let h1 = document.createElement("h1");
  h1.style.fontSize = "16px";

  h1.innerText = document.cookie.split("=")[1];

  userContainer.appendChild(h1);

  logout.style.display = "none";
  userContainer.addEventListener("click", () => {
    if (logout.style.display == "block") {
      logout.style.display = "none";
    } else {
      logout.style.display = "block";
    }
  });
  logout.addEventListener("click", () => {
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "login.html";
  });

  fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // console.log(JSON.parse(data[0].CourseImage));
    });

  document.getElementById("register").removeAttribute("href");
  document.getElementById("login").removeAttribute("href");
} else {
  document.getElementById("register").href = "../html/register.html";
  document.getElementById("login").href = "../html/login.html";
  logout.style.display = "none";

  document.querySelector("footer").style.position = "fixed";
  document.querySelector("footer").style.bottom = "0px";
  console.log(document.querySelector(".container"));
}
if (d.length < 1) {
  document.querySelector("footer").style.position = "fixed";
  document.querySelector("footer").style.bottom = "0px";
  console.log(document.querySelector(".container"));
  document.querySelector(".container").style.marginTop = "40px";
}
