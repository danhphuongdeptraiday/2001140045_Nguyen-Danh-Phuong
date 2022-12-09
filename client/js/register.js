let userInput = document.getElementById("username1");
let userPassword = document.getElementById("password1");
let confirmPassword = document.getElementById("cfpassword");
let form = document.getElementById("form");

let registerAPI = "http://localhost:3000/api/register";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (userPassword.value !== confirmPassword.value) {
    document.getElementById("cfpass").innerText = "Not match to password";
  } else {
    let userInformation = {
      username: userInput.value.trim(),
      password: userPassword.value.trim(),
    };

    fetch(registerAPI, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInformation),
    })
      .then((res) => {
        return res.json();
      })
      .then((bbb) => {
        let user = bbb;
        console.log(user);
        if (userInput.value == user.userName) {
          document.getElementById("alertUserName").innerText = user.errUser;
        }
        if (userPassword.value == "") {
          document.getElementById("alertPassword").innerText = user.errPassword;
        }

        if (user.message == "success") {
          alert("Create successfully. Go to the login page and ");
          window.location.href = "login.html";
        }
        userInput.value = "";
        userPassword.value = "";
        confirmPassword.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
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

function checkUser() {}
// let arrayInput = [userInput, userPassword, confirmPassword];
// checkEmpty(arrayInput);
// checkEqualPassword();

// function getSpecifiedTextError(rootInput) {
//   return rootInput.nextElementSibling;
// }

// function showError(rootInput, text) {
//   getSpecifiedTextError(rootInput).innerText = text;
// }

// function showSuccess(rootInput, text) {
//   let element = getSpecifiedTextError(rootInput);
//   element.innerText = text;
//   element.className = "successText";
// }

// function checkEqualPassword() {
//   if (userPassword.value === confirmPassword.value) {
//     let element = getSpecifiedTextError(confirmPassword);
//     element.innerText = "Matched password";
//     element.style.color = "green";
//   } else {
//     let element = getSpecifiedTextError(confirmPassword);
//     element.innerText = "Error confirm";
//     element.style.color = "red";
//   }
// }

// function checkEmpty(inputList) {
//   inputList.forEach((input) => {
//     // console.log(input);
//     if (!input.value) {
//       showError(input, "Your input is empty");
//     } else {
//       showSuccess(input, "Successfully");
//     }
//   });
//}
