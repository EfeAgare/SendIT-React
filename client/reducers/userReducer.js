import { USER_LOGIN, USER_SIGNUP } from '../constants/action-types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP:
      return {
        ...state,
        user: Object.assign({}, action.user)
      };
    case USER_LOGIN:
      return {
        ...state,
        user: Object.assign({}, action.user)
      };
    default:
      return state;
  }
};

export default userReducer;
