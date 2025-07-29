const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
  const addButton = card.querySelector('button');

  addButton.addEventListener('click', function (e) {
    e.preventDefault(); // Stop <a> redirection

    const name = card.querySelector('h3').textContent;
    const description = card.querySelector('p').textContent;
    const priceText = card.querySelector('.price').innerText;
    const image = card.querySelector('img').src;

    const product = {
      name,
      description,
      price: priceText,
      image
    };

    addToCart(product);
  });
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Optional: Avoid duplicates
  const exists = cart.some(item => item.name === product.name);
  if (!exists) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart.`);
  } else {
    alert(`${product.name} is already in your cart.`);
  }

  // Navigate to cart page after short delay
  setTimeout(() => {
    window.location.href = 'mens.html';
  }, 500);
}
