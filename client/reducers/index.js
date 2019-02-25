import { combineReducers } from 'redux';
import user from './userReducer';
import parcels from './parcelReducer';
const rootReducer = combineReducers({
  user,
  parcels
});

export default rootReducer;
