const productContainer = document.getElementById("product-container");
const shoppingCart = document.getElementById("shopping-cart");
const cartCount = document.getElementById("cart-count");
const cartList = document.getElementById("cart-list");
const closeCartList = document.getElementById("close-cart-list");
const cartItems = document.getElementById("cart-items");

let cart = [];

fetch("https://fakestoreapi.com/products")
	.then((res) => res.json())
	.then((products) => {
		products.forEach((product) => {
			const productCard = document.createElement("div");
			productCard.classList.add("product-card");
			productCard.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.title}">
        <div class="product-title">${product.title}</div>
        <div class="product-price">$${product.price}</div>
      `;
			productCard.addEventListener("click", () => addToCart(product));
			productContainer.appendChild(productCard);
		});
	});

shoppingCart.addEventListener("click", () => {
	cartList.style.display = "block";
});

closeCartList.addEventListener("click", () => {
	cartList.style.display = "none";
});

function addToCart(product) {
	const existingProduct = cart.find((p) => p.id === product.id);
	if (existingProduct) {
		existingProduct.quantity++;
	} else {
		cart.push({ ...product, quantity: 1 });
	}
	renderCart();
}

function renderCart() {
	cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
	cartItems.innerHTML = "";
	cart.forEach((item) => {
		const cartItem = document.createElement("li");
		cartItem.classList.add("cart-item");
		cartItem.innerHTML = `
      <img class="cart-item-image" src="${item.image}" alt="${item.title}">
      <div class="cart-item-title">${item.title}</div>
      <div class="cart-item-price">$${item.price}</div>
      <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
      <button class="delete-button" onclick="deleteFromCart(${item.id})">Delete</button>
    `;
		cartItems.appendChild(cartItem);
	});
}

function deleteFromCart(id) {
	cart = cart.filter((item) => item.id !== id);
	renderCart();
}
