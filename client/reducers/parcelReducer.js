import { LOAD_PARCEL_ORDER, CREATE_PARCEL } from '../constants/action-types';

const parcelReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_PARCEL:
      return [...state, Object.assign({}, action.parcel)];

    case LOAD_PARCEL_ORDER:
      return action.parcels;

    default:
      return state;
  }
};

export default parcelReducer;
