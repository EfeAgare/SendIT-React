import {CHANGE_PARCEL_STATUS } from '../constants/action-types';

export const changeStatus = (status,parcelId) => dispatch => {
  return fetch(`/api/v1/parcels/${parcelId}/status`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    body: JSON.stringify({status})
  })
    .then(res => res.json())
    .then(res => {
      if (
        res.message ===
        'Parcel Status Updated successfully and Email sent successfully'
      ) 
      dispatch({ type: CHANGE_PARCEL_STATUS, status: res.data });
      return res;
    })
    .catch(error => {
      throw error;
    });
};
