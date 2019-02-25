const changeDestination = (data, parcelId) => dispatch => {
  return fetch(`/api/v1//parcels/${parcelId}/destination`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      throw error;
    });
};

export default changeDestination;
