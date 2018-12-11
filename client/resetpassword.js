const button = document.getElementById('submit-btn');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password1');
const messageText = document.querySelector('#messageText');
const token = window.location.search.replace('?token=','');

button.addEventListener('click', (event) => {
  if (password.value !== confirmPassword.value) {
    messageText.textContent = 'Inputed Password does not Match';
    return;
  }
  const inputData = {
    password: password.value
  };
  event.preventDefault();
  fetch(`https://efe-sendit.herokuapp.com/api/v1/users/auth/resetpassword`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    body: JSON.stringify(inputData)
  })
    .then(res => res.json())
    .then((res) => {
        messageText.textContent = res.message;
        if (res.message === 'Authentication Failed') {
        messageText.textContent = res.message;
      } else{
            window.location.href="signin.html"
      }
    });
});
