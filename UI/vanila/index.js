const getStartedButton = document.querySelector('#get-started a');
const documentation = document.querySelector('#documentation');

window.addEventListener('load', (event) => {
  event.preventDefault();
  documentation.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(`https://efe-sendit.herokuapp.com/api-docs/#/`, {
      method: 'GET'
    })
  })
  if (localStorage.getItem('token')) {
    getStartedButton.href = 'profile.html';
  }else{
    getStartedButton.href = 'signup.html';
    localStorage.clear();
  }
});

