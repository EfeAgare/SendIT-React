import {
  LOAD_PARCEL_ORDER,
  CREATE_PARCEL,
  CURRENT_PARCEL_ORDER,
  LOAD_ALL_PARCEL_ORDER
} from '../constants/action-types';

const parcelReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_PARCEL:
      return [...state, Object.assign({}, action.parcel)];

    case LOAD_PARCEL_ORDER:
      return action.parcels;

    case LOAD_ALL_PARCEL_ORDER:
      return action.allparcels;

    default:
      return state;
  }
};

export default parcelReducer;

export const currentParcelReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_PARCEL_ORDER:
      return action.parcel;
    default:
      return state;
  }
};

// export const currentParcelReducer = (state = {}, action) => {
//   switch (action.type) {
//     case CURRENT_PARCEL_ORDER:
//       return action.parcel;
//     default:
//       return state;
//   }
// };