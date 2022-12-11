console.log(document.cookie.split("=")[1]);
let api = "http://localhost:3000/api/all/courses";

let userIcon = document.querySelector(".fa-user");
let userContainer = document.querySelector(".user");
let logout = document.querySelector(".logout");
let t = document.querySelector(".container");
let t1 = document.querySelector(".loginToSee");
if (document.cookie) {
  t1.style.display = "none";
  t.className = "container";
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
      let courseContainer = document.querySelector(".container");
      for (let i = 0; i < data.length; i++) {
        let divCourse = document.createElement("div");
        divCourse.setAttribute("id", data[i].CourseId);
        divCourse.setAttribute("class", "courses");
        let img = document.createElement("img");
        img.setAttribute("src", JSON.parse(data[i].CourseImage));
        let titleCourse = document.createElement("h1");
        titleCourse.innerHTML = data[i].CourseName;
        let buttonCourse = document.createElement("button");
        buttonCourse.setAttribute("id", "enroll");
        buttonCourse.innerText = "Enroll Course";
        divCourse.appendChild(img);
        divCourse.appendChild(titleCourse);
        divCourse.appendChild(buttonCourse);
        courseContainer.append(divCourse);
      }

      let listDivCourse = document.querySelectorAll(".courses #enroll");
      for (let i = 0; i < listDivCourse.length; i++) {
        listDivCourse[i].addEventListener("click", () => {
          takeEnrollCourse(
            document.cookie.split("=")[1],
            listDivCourse[i].parentElement.getAttribute("id")
          );
          console.log(listDivCourse[i].parentElement.getAttribute("id"));
          listDivCourse[i].parentElement.remove();
        });
      }

      if (data.length <= 3) {
        document.querySelector("footer").style.position = "fixed";
        document.querySelector("footer").style.bottom = "0px";
        document.querySelector(".container").style.marginTop = "40px";
      }

      // console.log(JSON.parse(data[0].CourseImage));
    });

  document.getElementById("register").removeAttribute("href");
  document.getElementById("login").removeAttribute("href");
} else {
  t.className = "unloginPage";

  document.getElementById("register").href = "../html/register.html";
  document.getElementById("login").href = "../html/login.html";
  logout.style.display = "none";

  document.querySelector("footer").style.position = "fixed";
  document.querySelector("footer").style.bottom = "0px";
  console.log(document.querySelector(".container"));
}

function takeEnrollCourse(username, courseid) {
  console.log(username + " -- " + courseid);

  fetch(`http://localhost:3000/api/enroll/${username}/${courseid}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
