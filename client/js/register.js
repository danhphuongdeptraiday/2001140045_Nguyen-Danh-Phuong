let userInput = document.getElementById("username1");
let userPassword = document.getElementById("password1");
let confirmPassword = document.getElementById("cfpassword");
let form = document.getElementById("form");
console.log(form);

let registerAPI = "http://localhost:3000/api/register";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const prePayload = new FormData(form);
  const payload = new URLSearchParams(prePayload);
  console.log([...payload]);
  fetch(registerAPI, {
    method: "POST",
    // headers: new Headers({ "Content-Type": "applications/json" }),
    body: JSON.stringify(payload),
    mode: "no-cors",
  })
    .then((res) => res)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
let arrayInput = [userInput, userPassword, confirmPassword];
checkEmpty(arrayInput);
checkEqualPassword();

function getSpecifiedTextError(rootInput) {
  return rootInput.nextElementSibling;
}

function showError(rootInput, text) {
  getSpecifiedTextError(rootInput).innerText = text;
}

function showSuccess(rootInput, text) {
  let element = getSpecifiedTextError(rootInput);
  element.innerText = text;
  element.className = "successText";
}

function checkEqualPassword() {
  if (userPassword.value === confirmPassword.value) {
    let element = getSpecifiedTextError(confirmPassword);
    element.innerText = "Matched password";
    element.style.color = "green";
  } else {
    let element = getSpecifiedTextError(confirmPassword);
    element.innerText = "Error confirm";
    element.style.color = "red";
  }
}

function checkEmpty(inputList) {
  inputList.forEach((input) => {
    // console.log(input);
    if (!input.value) {
      showError(input, "Your input is empty");
    } else {
      showSuccess(input, "Successfully");
    }
  });
}
