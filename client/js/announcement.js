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
