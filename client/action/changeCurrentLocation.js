import { CHANGE_PARCEL_CURRENTLOCATION } from '../constants/action-types';

export const changeCurrentLocation = (
  currentLocation,
  parcelId
) => dispatch => {
  return fetch(`/api/v1/parcels/${parcelId}/currentLocation`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    body: JSON.stringify({ currentLocation })
  })
    .then(res => res.json())
    .then(res => {
      if (
        res.message ===
        'Parcel Location Updated successfully  and Email sent successfully'
      )
        dispatch({ type: CHANGE_PARCEL_CURRENTLOCATION, location: res.data });
      return res;
    })
    .catch(error => {
      throw error;
    });
};
