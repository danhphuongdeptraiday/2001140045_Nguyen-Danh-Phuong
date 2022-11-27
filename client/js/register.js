let registerAPI = "http://localhost:3000/api/register";

document.getElementById("register_btn").addEventListener("click", (e) => {
  e.preventDefault();
  let userName = document.getElementById("username1").value;
  let password = document.getElementById("password1").value;
  let alertUsername = document.getElementById("alertUserName");
  let alertPassword = document.getElementById("alertPassword");
  if (userName != "" && password != "") {
    let s1 = userName.trim();
    let s2 = password.trim();
    console.log(s1);
    console.log(s2);
  }

  fetch(registerAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let USER = JSON.parse(data);
      for (let i = 0; i < USER.length; i++) {
        if (userName == USER.userName) {
        }
      }
    });

  if (userName.trim().length > 1 && password.trim().length > 1) {
  }
});
