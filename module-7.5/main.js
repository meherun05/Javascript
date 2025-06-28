let search = () => {
  let input = document.getElementById("inputValue").value;
  console.log(input);
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    .then((response) => response.json())
    .then((data) => addToView(data.meals));
};

let addToView = (foods) => {
  let containerSearchResults = document.getElementById(
    "containerSearchResults"
  );
  let detailsContainer = document.getElementById("detailsContainer");
  detailsContainer.innerHTML = "";

  if (foods === null || foods === undefined) {
    containerSearchResults.innerHTML = "";
    let div = document.createElement("div");

    div.innerHTML = `<h1 style="color:red">No Result Found</h5>`;
    containerSearchResults.appendChild(div);
  } else {
    containerSearchResults.innerHTML = "";
    foods.forEach((food) => {
      let div = document.createElement("div");
      div.classList.add("mealBox");
      div.innerHTML = `
            <img src="${food.strMealThumb}" alt="img" width= "100px" height="131px">
            <h4 style="color:brown">${food.strMeal}</h5>
        `;
      div.addEventListener("click", () => mealDetails(food.idMeal));
      containerSearchResults.appendChild(div);
    });
  }
};

let mealDetails = (id) => {
  console.log(`Fetching details for meal ID: ${id}`);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      let detailsContainer = document.getElementById("detailsContainer");
      detailsContainer.innerHTML = "";
      const meal = data.meals[0];
      console.log("Meal Details:", meal);
      let div = document.createElement("div");
      div.classList.add("mealBoxDetails");
      div.innerHTML = `
            <img src="${
              meal.strMealThumb
            }" alt="img" width= "100px" height="131px">
            <h4 style="color:brown">${meal.strMeal}</h5>
            <p>${meal.strInstructions.substring(0, 100)}</p>
        `;

      detailsContainer.appendChild(div);
    });
};
