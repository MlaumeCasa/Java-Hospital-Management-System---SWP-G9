const form = document.getElementById('sign-up_form');
const username_input = document.getElementById('username');
const password_input = document.getElementById('password');
const validation_errors = document.getElementById('validation-errors');

form.addEventListener('submit', (e) => {
    let errors = [];
    errors = getLoginErrors(username_input.value, password_input.value); //Get all errors.

    if (errors.length > 0) {
        e.preventDefault();
        validation_errors.innerHTML = errors.join('<br>');
    } else {
        validation_errors.innerHTML = "";
    }
});

function getLoginErrors(username, password) {
    let errors = [];

    if (username === '' || username == null) {
        errors.push("Username cannot be blank");
    } else if (username.length !== 14) {
        errors.push("Username must be 14 characters");
    }

    errors.push(...validatePassword(password));

    return errors;
}

function validatePassword(password) {
    let errors = [];

    if (!password) {
        errors.push("Password cannot be blank.");
        return errors;
    }

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter.");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number.");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character.");
    }

    return errors;
}