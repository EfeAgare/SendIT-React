import { USER_LOGIN } from '../constants/action-types';

export const userLogin = user => {
  return {
    type: USER_LOGIN,
    user
  };
};
export default userSignup => dispatch => {
  return fetch(`/api/v1/auth/signup`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(userSignup)
  })
    .then(res => res.json())
    .then(res => {
      if (res.message === 'Login successful') {
        dispatch(userLogin(res.data));
        localStorage.setItem('token', res.token);
      }
      return res;
    });
};
