import { CREATE_PARCEL } from '../constants/action-types';

export const createParcelOrder = parcel => {
  return {
    type: CREATE_PARCEL,
    parcel
  };
};

export default parcelOrder => dispatch => {
  return fetch(`/api/v1/parcels`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    body: JSON.stringify(parcelOrder)
  })
    .then(res => res.json())
    .then(res => {
      if (res.message === 'Parcels created successfully') {
        dispatch(createParcelOrder(res.data));
      }
      return res;
    })
    .catch(error => {
      throw error;
    });
};
