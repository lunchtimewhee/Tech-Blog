const logout = async (event) => {
    event.preventDefault();
    console.log('test');
    const response = await fetch('/api/user/logout');

    if (response.ok) {
        window.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
};

document.getElementById('logout').addEventListener('click', logout);
