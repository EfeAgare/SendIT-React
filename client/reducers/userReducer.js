import { USER_LOGIN } from '../constants/action-types';

const userReducer =(state={}, action) => {
  switch(action.type){
    case USER_LOGIN:
    return {
      
        ...state,
        articles: state.articles.concat(action.payload)
     
    }
    default:
    return state;
  }

}

export default userReducer