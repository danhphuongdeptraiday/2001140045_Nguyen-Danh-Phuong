let userInput = document.getElementById("username1");
let userPassword = document.getElementById("password1");
let form = document.getElementById("form");

let api = "http://localhost:3000/api/login";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  login(userInput.value, userPassword.value);
});

function login(username, password) {
  let userInformation = {
    username: username.trim(),
    password: password.trim(),
  };
  console.log(userInformation);
  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInformation),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.errMessage) {
        alert(data.errMessage);
      }

      if (data.message) {
        document.getElementById("alertUserName").innerText = data.message;
      }

      if (data === true) {
        document.querySelector(".bgShadow").style.display = "block";

        let i = 3;

        let t = setInterval(count, 1000);
        function count() {
          if (i >= 0) {
            document.getElementById("count").innerText = i;
            // console.log(i);
            i--;
          } else {
            clearInterval(t);
            window.location.href = "allcourse.html";
          }
        }

        // alert("Login success. Changing to all course page");
        // window.location.href = "allcourse.html";
        // let b = [];
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

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
    console.log("123");
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
  });
  document.getElementById("register").removeAttribute("href");
  document.getElementById("login").removeAttribute("href");
} else {
  document.getElementById("register").href = "../html/register.html";
  document.getElementById("login").href = "../html/login.html";
  logout.style.display = "none";
  console.log("empty");
}
