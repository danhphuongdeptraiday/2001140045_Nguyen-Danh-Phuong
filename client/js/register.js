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
      username: userInput.value,
      password: userPassword.value,
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
          alert("Create successfully");
          window.location.href = "login.html";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

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
