const getStartedButton = document.querySelector('#get-started a');

window.addEventListener('load', (event) => {
  event.preventDefault();
  if (localStorage.getItem('token')) {
    getStartedButton.href = 'profile.html';
  }else{
    getStartedButton.href = 'signup.html';
    localStorage.clear();
  }
});
