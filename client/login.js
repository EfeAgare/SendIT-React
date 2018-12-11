const button = document.getElementById('submit-btn');
const forgotPassword = document.getElementById('forgot-pswd');
const modal = document.getElementsByClassName('modal')[0];
const modalBtn = document.getElementById('modal-btn');
const modalEmailInput = document.getElementById('modal-email');
const modalMessageText = document.querySelector('#modal-messageText');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('psw');
const messageText = document.querySelector('#messageText');
const closeBtn = document.querySelector('.close');

forgotPassword.addEventListener('click', (event) => {
  event.preventDefault();
  modal.style.display = 'block';
});
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalMessageText.textContent = '';
});
modalEmailInput.addEventListener('input', () => {
  modalMessageText.textContent = '';
});
window.addEventListener('click', (event) => {
  if (event.target.className === 'modal') modal.style.display = 'none';
});
modalBtn.addEventListener('click', (event) => {
  modalMessageText.style.color = 'yellow' ;
  modalMessageText.textContent = 'Processing..';
  const inputData = {
    email: modalEmailInput.value,
  };
  event.preventDefault();
  fetch(`https://efe-sendit.herokuapp.com/api/v1/users/auth/resetpassword`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(inputData)
  })
    .then(res => res.json())
    .then((res) => {
      modalMessageText.style.color = 'green' ;
      if (res.message === 'Email send successfully. Kindly check your email for further instructions') {
        modalMessageText.textContent = res.message;
    }  else if (res.message === 'Email not Found') {
      messageText.textContent = res.message;
  } else {
      messageText.textContent = res.errors;
  }
})
.catch(error => {
  messageText.textContent = error +''+ 'server error'
})
});

button.addEventListener('click', (event) => {
  const inputData = {
    email: emailInput.value,
    password: passwordInput.value
  };
  
  event.preventDefault();
  fetch(`https://efe-sendit.herokuapp.com/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(inputData)
  })
    .then(res => res.json())
    .then((res) => {
      if (res.message === 'Login successful') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userRole', res.data.role);
        localStorage.setItem('username', res.data.username);
        if (res.data.role === 'admin') {window.location.href = 'admin.html'}
        else{ window.location.href = 'profile.html'};
      }else if (res.message === 'No account with this email address') {
        messageText.textContent = res.message;
    }else if (res.message === 'Invalid password') {
      messageText.textContent = res.message;
  }else {
        messageText.textContent = res.errors;
    }
})
.catch(error => {
    messageText.textContent = error + '' +'server error'
})
});