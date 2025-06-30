let selectedDrinks = [];
let render = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink")
    .then((response) => response.json())
    .then((data) => addToMainView(data.drinks));
};

render();

let addToMainView = (drinks) => {
  let mainContainer = document.getElementById("mainContainer");
  mainContainer.innerHTML = ""; // Clear previous content
  drinks.forEach((drink) => {
    let div = document.createElement("div");
    div.classList.add("drinkBox");
    div.innerHTML = `
      <img src="${drink.strDrinkThumb}" alt="img" width="100px" height="131px">
      <h4 style="color:brown">${drink.strDrink}</h4>
      <button onClick='singleProduct(${drink.idDrink})' class="detailsBtn">Details</button>
      <button class="addToGroupBtn" onclick="addToGroup('${drink.strDrink}', ${drink.idDrink})">Add To Group</button>`;
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
  mainContainer.innerHTML = "";
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
        <button class="addToGroupBtn" onclick="addToGroup('${drink.strDrink}', ${drink.idDrink})">Add To Group</button>`;
      mainContainer.appendChild(div);
    });
  }
};

let addToGroup = (drinkName, idDrink) => {
  console.log(drinkName);
  if (selectedDrinks.length >= 7) {
    alert("Cannot add more than 7 drinks to the group!");
    return;
  }
  if (!selectedDrinks.some((drink) => drink.id === idDrink)) {
    selectedDrinks.push({ name: drinkName, id: idDrink });
    updateGroupContainer();
  }
};

let updateGroupContainer = () => {
  let groupItems = document.getElementById("groupContainer");
  groupItems.innerHTML = "<h3>Grouped Items</h3>";
  selectedDrinks.forEach((drink) => {
    let div = document.createElement("div");
    div.classList.add("groupItem");
    div.textContent = drink.name;
    groupItems.appendChild(div);
  });
  let countDiv = document.createElement("div");
  countDiv.textContent = `Total Drinks: ${selectedDrinks.length}`;
  groupItems.appendChild(countDiv);
};
