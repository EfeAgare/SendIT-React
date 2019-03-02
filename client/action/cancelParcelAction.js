import { CANCEL_PARCEL_ORDER } from '../constants/action-types';
export const cancelParcel = parcelId => dispatch => {
  return fetch(`/api/v1//parcels/${parcelId}/cancel`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.message === 'Parcel cancelled successfully')
      dispatch({ type: CANCEL_PARCEL_ORDER, cancel: res.data });
      return res;
    })
    .catch(error => {
      throw error;
    });
};
