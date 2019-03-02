import {
  LOAD_PARCEL_ORDER,
  CURRENT_PARCEL_ORDER,
  LOAD_ALL_PARCEL_ORDER,
  ADMIN_LOAD_SINGLE_PARCEL
} from '../constants/action-types';

export const loadParcelOrder = parcels => {
  return {
    type: LOAD_PARCEL_ORDER,
    parcels
  };
};

export const loadAllParcelOrder = allparcels => {
  return {
    type: LOAD_ALL_PARCEL_ORDER,
    allparcels
  };
};

export const singleParcelOrder = parcel => {
  return {
    type: CURRENT_PARCEL_ORDER,
    parcel
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
      if (res.message == 'Parcels retrieved successfully') {
        dispatch(loadParcelOrder(res.data));
      }
      return res;
    })
    .catch(error => {
      throw error;
    });
};

export const loadSingleParcel = parcelId => dispatch => {
  return fetch(`/api/v1/users/${localStorage.getItem('userid')}/${parcelId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.message == 'Parcel retrieved successfully') {
        dispatch(singleParcelOrder(res.data));
      }
      return res;
    })
    .catch(error => {
      throw error;
    });
};
export const adminLoadSingleParcel = parcelId => dispatch => {
  return fetch(`/api/v1/parcels/${parcelId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.message == 'Parcel retrieved successfully') {
        dispatch(
          dispatch({ type: ADMIN_LOAD_SINGLE_PARCEL, singleparcel: res.data })
        );
      }
      return res;
    })
    .catch(error => {
      throw error;
    });
};

export const loadAllParcel = () => dispatch => {
  return fetch(`/api/v1/parcels`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch(loadAllParcelOrder(res.data));

      return res;
    })
    .catch(error => {
      throw error;
    });
};
