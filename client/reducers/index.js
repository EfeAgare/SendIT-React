import { combineReducers } from 'redux';
import user from './userReducer';
import parcels, {
  currentParcelReducer as currentParcel
} from './parcelReducer';
import flashMessages from './flashMessages'

const rootReducer = combineReducers({
  user,
  parcels,
  currentParcel,
  flashMessages
});

export default rootReducer;
