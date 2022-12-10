let api = "http://localhost:3000/api/announcement";

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    let obj = JSON.parse(data);

    let arr = Object.values(obj);
    // console.log(arr);
    let p = document.querySelectorAll(".salary p");
    for (let i = 0; i < p.length; i++) {
      p[i].innerText = arr[i];
    }
  });

let userIcon = document.querySelector(".fa-user");
let userContainer = document.querySelector(".user");
let logout = document.querySelector(".logout");
console.log(userIcon);
console.log(document.cookie);
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
  document.getElementById("register").removeAttribute("href");
  document.getElementById("login").removeAttribute("href");
} else {
  document.getElementById("register").href = "../html/register.html";
  document.getElementById("login").href = "../html/login.html";
  logout.style.display = "none";
  console.log("empty");
}
