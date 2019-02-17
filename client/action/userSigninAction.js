import { USER_LOGIN } from '../constants/action-types';

export const userLogin = user => {
  return {
    type: USER_LOGIN,
    user
  };
};


export default userSignin => dispatch => {
  return fetch(`/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(userSignin)
  })
    .then(res => res.json())
    .then(res => {
      if (res.message === 'Login successful') {
        dispatch(userLogin(res.data));
        localStorage.setItem('token', res.data.token);
      
      } 
      return res;
    });
};
