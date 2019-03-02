import { UPDATE_DESTINATION } from '../constants/action-types';
export const changeDestination = (deliveryAddress, parcelId) => dispatch => {
  return fetch(`/api/v1/parcels/${parcelId}/destination`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    body: JSON.stringify({ deliveryAddress })
  })
    .then(res => res.json())
    .then(res => {
      if (res.message === 'Parcel destination changed successfully')
      dispatch({ type: UPDATE_DESTINATION, update: res.data });
      return res;
    })
    .catch(error => {
      throw error;
    });
};
