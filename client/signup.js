const button = document.getElementById('submit-btn');
const messageText = document.getElementById('messageText');

button.addEventListener('click', (event) => {
    const userName = document.getElementById('username');
    const lastName = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const inputData = {
        username: userName.value,
        lastname: lastName.value,
        email: emailInput.value,
        password: passwordInput.value
    };
    event.preventDefault();
    fetch(`https://efe-sendit.herokuapp.com/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(inputData),
            mode: 'cors'
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            if (res.message === 'user created successfully') {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userRole', res.data.role);
                localStorage.setItem('username', res.data.username);
                window.location.href = 'profile.html';         
            } else if (res.message === 'Email Address Already exists') {
                messageText.textContent = res.message;
            } else {
                messageText.textContent = res.errors;
            }
        })
        .catch(error => {
            messageText.textContent = error + 'server error'
        })
});