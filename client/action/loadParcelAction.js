import { LOAD_PARCEL_ORDER } from '../constants/action-types';

export const loadParcelOrder = parcels => {
  return {
    type: LOAD_PARCEL_ORDER,
    parcels
  };
};

export const loadParcel = () => dispatch => {
  return fetch(`/api/v1/users/${localStorage.getItem('userid')}/parcels`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.message == "Parcels retrieved successfully") {
        dispatch(loadParcelOrder(res.data));
      }
      return res;
    })
    .catch(error => {
      throw error;
    });
};
