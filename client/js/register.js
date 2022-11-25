let userName = document.getElementById("username1").value;
let password = document.getElementById("password1").value;

document.getElementById("register_btn").addEventListener("click", (e) => {
  e.preventDefault();
  if (userName != "" && password != "") {
    console.log("Username :" + userName);
    console.log("Password :" + password);
  }
});
