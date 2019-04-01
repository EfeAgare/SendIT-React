import { SET_CURRENT_USER, SIGN_OUT_USER } from '../constants/action-types';

export const userLogin = user => {
  return {
    type: SET_CURRENT_USER,
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
        localStorage.setItem('userid', res.data.id);
      }
      return res;
    })
    .catch(error => {
      throw error;
    });
};

export const signOutUser = () => dispatch => {
  window.localStorage.clear();
  dispatch({ type: SIGN_OUT_USER });
};
