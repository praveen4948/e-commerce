// main.js

const products = [
  { id: 1, name: 'Product 1', price: 19.99, imageUrl: 'images/product1.jpeg' },
  { id: 2, name: 'Product 2', price: 29.99, imageUrl: 'images/product2.webp' },
  { id: 3, name: 'Product 3', price: 39.99, imageUrl: 'images/product3.webp' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderProducts() {
  const productsSection = document.getElementById('products');

  products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product');
      productCard.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productsSection.appendChild(productCard);
  });
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (product) {
      cart.push(product);
      saveCartToLocalStorage();
      alert(`Product with ID ${productId} added to cart!`);
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function increaseQuantity(productId) {
  const productIndex = cart.findIndex(item => item.id === productId);
  if (productIndex !== -1) {
      cart[productIndex].quantity = (cart[productIndex].quantity || 1) + 1;
      saveCartToLocalStorage();
  }
  location.reload()
}

function deleteItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToLocalStorage();
  location.reload()
}

window.onload = () => {
  renderProducts();
};
