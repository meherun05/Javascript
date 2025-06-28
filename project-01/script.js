let allProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      displayProduct(data);
    });
};

let displayProduct = (products) => {
  let productContainer = document.getElementById("productContainer");

  products.forEach((product) => {
    let div = document.createElement("div");
    div.classList.add("productBox");

    div.innerHTML = `
            <img src="${product.image}" alt="img" width= "100px" height="131px">
            <h5>${product.title}</h5>
            <p><span style="color:rgb(6, 127, 129)">Price</span> : <span style="color:rgb(12, 73, 153)">${product.price}</span> $</p>
            <button onClick='singleProduct(${product.id})'>Details</button>
            <button class="addToCartBtn">Add To Cart</button>
        `;
    let addToCartBtn = div.querySelector(".addToCartBtn");
    addToCartBtn.addEventListener("click", () => addToCart(product));
    productContainer.appendChild(div);
    console.log(product);
  });
};
let addToCart = (product) => {
  let cartContainer = document.getElementById("cartContainer");
  let total = document.getElementById("total");
  let div = document.createElement("div");
  div.classList.add("cart");

  div.innerHTML = `
        <h5>${product.title.slice(0, 10)}</h5>
        <p class="price">${product.price}</p>
    `;
  cartContainer.appendChild(div);

  let cartItems = cartContainer.getElementsByClassName("cart");
  let totalPrice = 0;
  for (let item of cartItems) {
    let price = parseFloat(item.querySelector(".price").textContent);
    totalPrice += price;
  }
  total.innerHTML = totalPrice.toFixed(2);
};

let singleProduct = (productId) => {
  console.log(productId)
  fetch("https://fakestoreapi.com/products/"+productId)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
allProducts();
