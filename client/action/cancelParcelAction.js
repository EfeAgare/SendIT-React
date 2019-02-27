export const cancelParcel = (parcelId) =>  {
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
      return res;
    })
    .catch(error => {
      throw error;
    });
};