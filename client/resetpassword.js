const button = document.getElementById('submit-btn');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password1');
const messageText = document.querySelector('#messageText');
const token = window.location.search.replace('?token=','');

button.addEventListener('click', (event) => {
  event.preventDefault();
  if (password.value !== confirmPassword.value) {
    messageText.textContent = 'Inputed Password does not Match';
    return;
  }
  const inputData = {
    password: password.value
  };
  
  fetch(`https://efe-sendit.herokuapp.com/api/v1/users/auth/resetpassword`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    body: JSON.stringify(inputData)
  })
    .then(response => response.json())
    .then((response) => {
      messageText.textContent = response.message;
      if (response.message === 'Authentication Failed') {
        window.location.href = 'signin.html';
      } 
    });
});
