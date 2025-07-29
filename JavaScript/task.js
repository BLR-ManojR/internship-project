let form = document.getElementById('signup-form');
let un = document.getElementById('username');
let pass = document.getElementById('password');
let cpass = document.getElementById('Cpassword');
let num = document.getElementById('num');
let mail = document.getElementById('mail');
let dob = document.getElementById('date');
let genderRadios = document.getElementsByName('gender');

let unError = document.getElementById('usernameError');
let passError = document.getElementById('passwordError');
let cpassError = document.getElementById('CpasswordError');
let mailError = document.getElementById('mailError');
let numError = document.getElementById('numError');
let dateError = document.getElementById('dateError');
let genError = document.getElementById('genderError');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear errors
    unError.textContent = "";
    passError.textContent = "";
    cpassError.textContent = "";
    mailError.textContent = "";
    numError.textContent = "";
    dateError.textContent = "";
    genError.textContent = "";

    let isValid = true;

    let usernameValue = un.value.trim();
    if (!usernameValue) {
        unError.textContent = "Username cannot be empty";
    } else if (usernameValue.length < 3) {
        unError.textContent = "Username must be at least 3 characters";
    } else if (usernameValue.length > 15) {
        unError.textContent = "Username must be less than 15 characters";
    } else if (!/(?=.[a-z])(?=.[A-Z])(?=.*\d)/.test(usernameValue)) {
        unError.textContent = "Username must contain uppercase, lowercase letters, and numbers";
    }

    let passwordValue = pass.value.trim();
    if (!passwordValue) {
        passError.textContent = "Password cannot be empty";
    } else if (passwordValue.length < 3) {
        passError.textContent = "Password must be at least 3 characters";
        
    } else if (passwordValue.length > 15) {
        passError.textContent = "Password must be less than 15 characters";
    } else if (!/(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[&*#@])/.test(passwordValue)) {
        passError.textContent = "Password must contain uppercase, lowercase, number and special character";
    }

    let confirmValue = cpass.value.trim();
    if (!confirmValue) {
        cpassError.textContent = "Confirm password cannot be empty";
        isValid = false;
    } else if (passwordValue !== confirmValue) {
        cpassError.textContent = "Passwords do not match";
        isValid = false;
    }

    let emailValue = mail.value.trim();
    if (!emailValue) {
        mailError.textContent = "Email cannot be empty";
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        mailError.textContent = "Enter a valid email address";
        isValid = false;
    }

    let numberValue = num.value.trim();
    if (!numberValue) {
        numError.textContent = "Enter the number";
        isValid = false;
    } else if (!/^\d{10}$/.test(numberValue)) {
        numError.textContent = "Enter a valid 10-digit number";
        isValid = false;
    }

    if (!dob.value) {
        dateError.textContent = "Date of birth is required!";
        isValid = false;
    }

    let genderValue = "";
    for (let radio of genderRadios) {
        if (radio.checked) {
            genderValue = radio.value;
            break;
        }
    }
    if (!genderValue) {
        genError.textContent = "Please select a gender!";
        isValid = false;
    }

    if (isValid) {
        let userData = {
            username: usernameValue,
            password: passwordValue,
            email: emailValue,
            number: numberValue,
            dob: dob.value,
            gender: genderValue
        };

        localStorage.setItem('signupData', JSON.stringify(userData));
        alert("Sign up successful!");
        form.reset();
        window.location.href = "login.html";
    }
});