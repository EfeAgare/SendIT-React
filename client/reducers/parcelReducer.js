import {
  LOAD_PARCEL_ORDER,
  CREATE_PARCEL,
  CURRENT_PARCEL_ORDER,
  LOAD_ALL_PARCEL_ORDER,
  UPDATE_DESTINATION,
  CANCEL_PARCEL_ORDER,
  CHANGE_PARCEL_STATUS,
  CHANGE_PARCEL_CURRENTLOCATION,
  ADMIN_LOAD_SINGLE_PARCEL
} from '../constants/action-types';

const parcelReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_PARCEL:
      return [...state, Object.assign({}, action.parcel)];

    case LOAD_PARCEL_ORDER:
      return action.parcels;

    case LOAD_ALL_PARCEL_ORDER:
      return action.allparcels;

    case UPDATE_DESTINATION: {
      const index = state.indexOf(
        state.find(parcel => parcel.id === action.update.id)
      );
      state[index] = action.update;
      return state;
    }
    case CANCEL_PARCEL_ORDER: {
      const index = state.indexOf(
        state.find(parcel => parcel.id === action.cancel.id)
      );
      state[index] = action.cancel;
      return state;
    }

    case CHANGE_PARCEL_STATUS: {
      const index = state.indexOf(
        state.find(parcel => parcel.id === action.status.id)
      );
      state[index] = action.status;
      return state;
    }

    case CHANGE_PARCEL_CURRENTLOCATION: {
      const index = state.indexOf(
        state.find(parcel => parcel.id === action.location.id)
      );
      state[index] = action.location;
      return state;
    }

    default:
      return state;
  }
};

export default parcelReducer;

export const currentParcelReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_PARCEL_ORDER:
      return action.parcel;
    case ADMIN_LOAD_SINGLE_PARCEL:
      return action.singleparcel;
    default:
      return state;
  }
};
