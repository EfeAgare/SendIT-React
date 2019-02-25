const resetPasswordEmail = email => dispatch => {
  return fetch(`/api/v1/users/auth/resetpassword`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      throw error;
    });
};
export default resetPasswordEmail;
