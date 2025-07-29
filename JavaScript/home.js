const userData=JSON.parse(localStorage.getItem("signupData"));
if(!userData){
    alert("Invalid session data.please log in again .");
    window.location.href="login.html"
}else{
    document.getElementById("welcomMessage").textContent=`welcome back,${userData.username}`;
}

// === 1. Smooth Scrolling for internal links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === 2. Add to Cart button functionality ===
document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('p').textContent;
    alert(`${productName} (${productPrice}) added to cart!`);
    console.log(`Added to cart: ${productName} - ${productPrice}`);
  });
});

// === 3. Newsletter Subscription ===
function subscribeNewsletter(event) {
  event.preventDefault();
  const emailInput = event.target.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  if (!email) {
    alert("Please enter a valid email.");
    return;
  }

  // Simulated backend action
  console.log("Subscribed with email:", email);
  alert(`Thank you for subscribing, ${email}!`);
  emailInput.value = "";
}

// === 4. Carousel Scroll Logic ===
let scrollAmount = 0;

function moveCarousel(direction) {
  const track = document.querySelector('.carousel-track');
  const itemWidth = document.querySelector('.category').offsetWidth + 20; // includes margin
  scrollAmount += direction * itemWidth;

  const maxScroll = track.scrollWidth - track.clientWidth;
  scrollAmount = Math.max(0, Math.min(scrollAmount, maxScroll));

  track.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

// === 5. Dynamic Welcome Message ===
function setWelcomeMessage() {
  const welcome = document.getElementById("welcomMessage");
  const username = localStorage.getItem("username") || "Guest";
  welcome.textContent = `Welcome, ${username}`;
}
// Simulate login name
localStorage.setItem("username", "Manoj");
setWelcomeMessage();

// === 6. Highlight nav links on scroll ===
const sections = document.querySelectorAll("section.hero");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
