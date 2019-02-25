export default inputPassword => dispatch => {
  return fetch(`/api/v1/users/auth/resetpassword`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    body: JSON.stringify({ inputPassword })
  })
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      throw error;
    });
};
