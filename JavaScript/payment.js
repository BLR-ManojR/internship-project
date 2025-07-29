
  document.getElementById('paymentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate form fields
    const fullname = document.getElementById('fullname').value.trim();
    const address = document.getElementById('address').value.trim();
    const email = document.getElementById('email').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!fullname || !address || !email || !paymentMethod) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    // Optionally validate card if not COD
    if (paymentMethod !== "cod") {
      const card = document.getElementById('card').value.trim();
      if (!card || card.length < 12) {
        alert("⚠️ Please enter a valid card number.");
        return;
      }
    }

    // Clear cart and redirect
    alert("✅ Payment Successful!\nThank you for shopping with Gentleman Jones.");
    localStorage.removeItem("cart");
    localStorage.removeItem("orderTotal");
   window.location.href = "home.html";

  });

