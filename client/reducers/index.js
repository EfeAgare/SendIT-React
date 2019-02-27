import { combineReducers } from 'redux';
import user from './userReducer';
import parcels, {
  currentParcelReducer as currentParcel
} from './parcelReducer';
const rootReducer = combineReducers({
  user,
  parcels,
  currentParcel
});

export default rootReducer;
