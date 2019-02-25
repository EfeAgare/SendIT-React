import { SET_CURRENT_USER } from '../constants/action-types';

const userReducer = (state = {
  detail: { name: ''}
}, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: action.isAuthenticated || true,
        detail: Object.assign({}, action.user)
      };
    default:
      return state;
  }
};

export default userReducer;
