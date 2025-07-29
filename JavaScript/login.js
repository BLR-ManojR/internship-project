let form = document.getElementById('login-form');
let email = document.getElementById('email');
let pass = document.getElementById('password');

let emailError = document.getElementById('emailError');
let passError = document.getElementById('passwordError');

form.addEventListener('submit', (e) => {
    emailError.textContent = "";
    passError.textContent = "";
    e.preventDefault();

    let valid = true;

    let emailValue = email.value.trim();
    let passValue = pass.value.trim();

    if (!emailValue) {
        emailError.textContent = "Please enter your email.";
        valid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
        emailError.textContent = "Invalid email format.";
        valid = false;
    }

    if (!passValue) {
        passError.textContent = "Password cannot be empty.";
        valid = false;
    } else if (!/(?=.*[a-z])/.test(passValue)) {
        passError.textContent = "Password must include a lowercase letter.";
        valid = false;
    } else if (!/(?=.*[A-Z])/.test(passValue)) {
        passError.textContent = "Password must include an uppercase letter.";
        valid = false;
    } else if (!/(?=.*\d)/.test(passValue)) {
        passError.textContent = "Password must include a number.";
        valid = false;
    } else if (!/(?=.*[!@#$%^&*])/.test(passValue)) {
        passError.textContent = "Password must include a special character (!@#$%^&*).";
        valid = false;
    }

    if (valid) {
        let user = JSON.parse(localStorage.getItem('signupData'));
        if (!user) {
            alert("No user found. Please sign up.");
            return;
        }

        if (emailValue === user.email && passValue === user.password) {
            alert("Login successful.");
            window.location.href = "home.html";
        } else {
            alert("Invalid credentials.");
        }
    }
});
