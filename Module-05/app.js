let target = document.getElementById("title");

target.style.color = "red";

let box = document.getElementsByClassName("box");

for (let i = 0; i < box.length; i++) {
  let element = box[i];
  console.log(element.innerText);
  element.style.backgroundColor = "green";
  if (element.innerText === "Box-5") {
    element.style.backgroundColor = "red";
  }
}

let button = document
  .getElementById("addHandler")
  .addEventListener("click", (e) => {
    let container = document.getElementById("name-con");
    let name = document.getElementById("name").value;
    // console.log(container)
    // console.log(name)
    let p = document.createElement("h5");
    p.classList.add("child");
    p.innerText = "Hi! There " + name;
    container.appendChild(p);
    document.getElementById("name").value = "";

    let allBox = document.getElementsByClassName("child");

    for (let element of allBox) {
      element.addEventListener("click", (e) => {
        e.target.parentNode.removeChild(element);
      });
    }
  });

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    displayData(data);
  })
  .catch((err) => {
    console.log(err);
  });

let displayData = (userData) => {
  let userDataContainer = document.getElementById("userData-container");

  userData.forEach((user) => {
    let div = document.createElement("div");
    div.classList.add("details");

    div.innerHTML = `
        <h4>Title</h4>
        <p>Description</p>
        <button>Details</button>
        `;

    userDataContainer.appendChild(div);
  });
};
