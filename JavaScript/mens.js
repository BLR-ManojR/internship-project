document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-items");
  const totalDisplay = document.querySelector(".cart-summary strong");
  const checkoutButton = document.querySelector(".checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Helper function: clean price string like "₹1277" → 1277
  function parsePrice(priceText) {
    const match = priceText.match(/₹\s?(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  // Render all items
  function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalDisplay.textContent = "Total: ₹0";
      return;
    }

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");

      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="item-price">${item.price}</p>
        </div>
        <div class="item-qty">
          Qty: <input type="number" value="1" min="1" data-index="${index}" />
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;

      cartContainer.appendChild(itemDiv);
    });

    updateTotal();
  }

  // Update total price
  function updateTotal() {
    const qtyInputs = document.querySelectorAll(".item-qty input");
    let total = 0;

    qtyInputs.forEach((input, i) => {
      const priceText = cart[i].price;
      const price = parsePrice(priceText);
      const qty = parseInt(input.value);
      total += price * qty;
    });

    totalDisplay.textContent = `Total: ₹${total}`;
  }

  // Event: Quantity change
  cartContainer.addEventListener("input", (e) => {
    if (e.target.matches(".item-qty input")) {
      updateTotal();
    }
  });

  // Event: Remove button
  cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  // Event: Checkout
  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    // Optionally, store total for use in payment page
    const total = totalDisplay.textContent.replace("Total: ₹", "");
    localStorage.setItem("orderTotal", total);

    window.location.href = "payment.html"; // Navigate to payment page
  });

  // Initial render
  renderCart();
});
