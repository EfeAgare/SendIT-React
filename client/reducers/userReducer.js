import { SET_CURRENT_USER,SIGN_OUT_USER } from '../constants/action-types';
import isEmpty from 'lodash/isEmpty'

const initialState = {
  isAuthenticated: false,
  detail: { name: '' }
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        detail: {...state, ...action.user }
      };
      case SIGN_OUT_USER:
      return initialState;
      default:
      return state;
    }
  };
  
  export default userReducer;
  