const loginButton = document.getElementById('nav_login'); //navbar login button
const signUpButton = document.getElementById('nav_sign-up'); // navbar signup button

const modalSignupBtn = document.getElementById('submit-signup');
const modalLoginBtn = document.getElementById('submit-login');

const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');

const modalCloseBtns = document.querySelectorAll('.delete');
const modalCancelBtns = document.querySelectorAll('.cancel');
const modalOverlays = document.querySelectorAll('.modal-background');

const signupForm = document.getElementById('signup_form');
const signupInfo = document.getElementById('signup_info');
const firstName = document.getElementById('first_name_signup');
const lastName = document.getElementById('last_name_signup');
const username = document.getElementById('username_signup');
const email = document.getElementById('email_signup');
const password = document.getElementById('password_signup');


const loginFormHander = async (event) => {
    event.preventDefault();

    let username = document.getElementById('username').value.trim();
    // Convert username to lowercase to match db value
    username.toLowerCase();
    const password = document.getElementById('password').value.trim();

    let login_info = document.getElementById('login_info');
    // Reset form when done
    login_info.textContent = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const { message } = await response.json();

        if (!response.ok) {
            throw new Error(`${response.status} ${message}`);
        }

        window.location.replace('/');
    } catch (error) {
        login_info.textContent = error;
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const first_name = firstName.value;
    const last_name = lastName.value;
    const user_name = username.value;
    const pass_word = password.value;


    try {
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: first_name,
                lastName: last_name,
                username: user_name,
                password: pass_word,

            }),
        });

        const { message } = await response.json();

        if (!response.ok) {
            throw new Error(`(${response.status}): ${message}`);
        }

        // Navigate to profile page after signup.
        window.location.replace('/');
    } catch (error) {
        signupInfo.textContent = error;
    }
};

const clearForm = function () {
    const firstName = document.getElementById('first_name_signup');
    const lastName = document.getElementById('last_name_signup');
    const username = document.getElementById('username_signup');
    const password = document.getElementById('password_signup');

    [
        firstName,
        lastName,
        username,
        password,
    ].forEach((field) => {
        field.value = '';
        field.classList.remove('is-danger', 'is-success');
        field.textContent = '';
    });
};

const showLoginModal = function () {
    loginModal.classList.toggle('is-active');
};

const showSignupModal = function () {
    signupModal.classList.toggle('is-active');
};

const closeModal = function () {
    loginModal.classList.remove('is-active');
    signupModal.classList.remove('is-active');
    clearForm();
};

loginButton.addEventListener('click', showLoginModal);
signUpButton.addEventListener('click', showSignupModal);


modalLoginBtn.addEventListener('click', loginFormHander);
modalSignupBtn.addEventListener('click', signupFormHandler);


console.log(modalCloseBtns);
console.log(modalCancelBtns);
console.log(modalOverlays);

// Selects all close, cancel, or out-of-bounds elements on both signup and login modals and allows the modals to be closed.
[...modalCloseBtns, ...modalCancelBtns, ...modalOverlays].forEach((button) => {
    button.addEventListener('click', closeModal);
});


