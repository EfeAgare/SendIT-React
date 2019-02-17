import { userLogin } from './userSigninAction';
export default userSignup => dispatch => {
  return fetch(`/api/v1/auth/signup`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(userSignup)
  })
    .then(res => res.json())
    .then(res => {
      if (res.message === 'user created successfully') {
        dispatch(userLogin(res.data));
        localStorage.setItem('token', res.data.token);
      }
      return res;
    });
};
