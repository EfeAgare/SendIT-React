const button = document.getElementById('submit-btn');
const messageText = document.querySelector('#messageText');
const token = window.location.search.replace('?token=','');

button.addEventListener('click', (event) => {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('password1');
 
  const inputData = {
    password: password.value,
    confirm: confirmPassword.value
  };
  event.preventDefault();
  fetch(`https://efe-sendit.herokuapp.com/api/v1/users/auth/resetpassword`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    body: JSON.stringify(inputData)
  })
    .then(res => res.json())
    .then((res) => {
        console.log(res)
        if (res.message === 'Email sent.')window.location.href = 'signin.html';
        else if (res.message === 'Authentication Failed') {
          messageText.textContent = res.message;
        }
        else if (res.message === 'Password does not match') {
            messageText.textContent = res.message;
        }else {
              messageText.textContent =  res.message;
         }
      })
      .catch(error => {
        console.log(error)
          messageText.textContent = error + '' +'server error'
      })
      });
        

