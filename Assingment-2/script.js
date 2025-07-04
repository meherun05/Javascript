let selectedDrinks = [];
let render = () => {
  fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
  )
    .then((response) => response.json())
    .then((data) => addToMainView(data.drinks));
};

render();

let addToMainView = (drinks) => {
  let mainContainer = document.getElementById("mainContainer");
  mainContainer.innerHTML = "";
  drinks.forEach((drink) => {
    let div = document.createElement("div");
    div.classList.add("drinkBox");
    div.innerHTML = `
      <img src="${drink.strDrinkThumb}" alt="img" width="100px" height="120px">
      <h4 style="color:brown">${drink.strDrink}</h4>
      <button onClick='singleProduct(${drink.idDrink})' class="detailsBtn">Details</button>
      <button class="addToGroupBtn" onclick="addToGroup('${drink.strDrink}', ${drink.idDrink}, '${drink.strDrinkThumb}')">Add To Group</button>`;
    mainContainer.appendChild(div);
  });
};

let search = () => {
  let input = document.getElementById("inputValue").value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`)
    .then((response) => response.json())
    .then((data) => searchResultAddToView(data.drinks));
};

let searchResultAddToView = (drinks) => {
  let mainContainer = document.getElementById("mainContainer");
  let groupItems = document.getElementById("groupContainer");
  mainContainer.innerHTML = "";
  groupItems.innerHTML = "";
  groupItems.innerHTML = "<h3>Grouped Items</h3>";
  selectedDrinks = [];
  if (!drinks || drinks === "no data found" || drinks === null) {
    let div = document.createElement("div");
    div.innerHTML = `<h1 style="color:red">No Result Found</h1>`;
    mainContainer.appendChild(div);
  } else {
    drinks.forEach((drink) => {
      let div = document.createElement("div");
      div.classList.add("drinkBox");
      div.innerHTML = `
        <img src="${drink.strDrinkThumb}" alt="img" width="100px" height="131px">
        <h4 style="color:brown">${drink.strDrink}</h4>
        <button onClick='singleProduct(${drink.idDrink})' class="detailsBtn">Details</button>
        <button class="addToGroupBtn" onclick="addToGroup('${drink.strDrink}', ${drink.idDrink}, '${drink.strDrinkThumb}')">Add To Group</button>`;
      mainContainer.appendChild(div);
    });
  }
};

let addToGroup = (drinkName, idDrink, drinkThumb) => {
  console.log(
    `Adding to group: ${drinkName}, ID: ${idDrink}, Image: ${drinkThumb}`
  );
  if (selectedDrinks.length >= 7) {
    alert("Cannot add more than 7 drinks to the group!");
    return;
  }
  if (!selectedDrinks.some((drink) => drink.id === idDrink)) {
    selectedDrinks.push({ name: drinkName, id: idDrink, thumb: drinkThumb });
    updateGroupContainer();
  }
};

let updateGroupContainer = () => {
  let groupItems = document.getElementById("groupContainer");
  groupItems.innerHTML = "<h3>Grouped Items</h3>";
  selectedDrinks.forEach((drink) => {
    let div = document.createElement("div");
    div.classList.add("groupItem");
    div.innerHTML = `
      <img src="${drink.thumb}" alt="${drink.name}" width="50px" height="50x">
      <span>${drink.name}</span>`;
    groupItems.appendChild(div);
  });
  let countDiv = document.createElement("div");
  countDiv.classList.add("groupCount");
  countDiv.textContent = `Total Drinks: ${selectedDrinks.length}`;
  groupItems.appendChild(countDiv);
};

let singleProduct = (idDrink) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
    .then((response) => response.json())
    .then((data) => showDrinkModal(data.drinks[0]));
};

let showDrinkModal = (drink) => {
  let modal = document.getElementById("drinkModal");
  let modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
          <h3>${drink.strDrink}</h3>
          <img src="${drink.strDrinkThumb}" alt="${drink.strDrink} width="150px" height="150x">
          <p><strong>Category:</strong> ${drink.strCategory}</p>
          <p><strong>Glass:</strong> ${drink.strGlass}</p>
          <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
        `;

  modal.style.display = "flex";
};

let closeModal = () => {
  let modal = document.getElementById("drinkModal");
  modal.style.display = "none";
};
