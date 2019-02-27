export const changeDestination = (deliveryAddress, parcelId) => {
  return fetch(`/api/v1/parcels/${parcelId}/destination`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    body: JSON.stringify({ deliveryAddress })
  })
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      throw error;
    });
};
