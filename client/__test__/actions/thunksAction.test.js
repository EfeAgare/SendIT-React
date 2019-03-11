import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  SET_CURRENT_USER,
  CURRENT_PARCEL_ORDER,
  LOAD_ALL_PARCEL_ORDER,
  LOAD_PARCEL_ORDER,
  CREATE_PARCEL,
  UPDATE_DESTINATION,
  CANCEL_PARCEL_ORDER,
  CHANGE_PARCEL_STATUS,
  CHANGE_PARCEL_CURRENTLOCATION,
  ADMIN_LOAD_SINGLE_PARCEL
} from '../../constants/action-types';
import userSignup from '../../action/userSignupAction';
import userSignin from '../../action/userSigninAction';
import { parcelOrder } from '../ __mocks__/mockData';
import {
  loadParcel,
  loadSingleParcel,
  adminLoadSingleParcel,
  loadAllParcel
} from '../../action/loadParcelAction';
import { changeDestination } from '../../action/parcelDestinationAction';
import resetPasswordEmail from '../../action/emailAction';
import { cancelParcel } from '../../action/cancelParcelAction';
import { changeStatus } from '../../action/changeParcelStatus';
import { changeCurrentLocation } from '../../action/changeCurrentLocation';
import parcelCreateOrder from '../../action/createParcelAction'

const mockStore = configureMockStore([thunk]);
describe('Testing API calls', () => {
  beforeEach(() => {});
  const fetchResponse = {
    message: 'user created successfully',
    data: {
      username: 'agare',
      lastname: 'Efe',
      email: 'knowled@gmail.com',
      password: '2000goodnews',
      passwordConfirmation: '2000goodnews'
    }
  };
  const expectedUserLogin = [
    {
      type: SET_CURRENT_USER
    }
  ];
  it('should dispatch SET_CURRENT_USER ACTION when userSignupAction is called', done => {
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, expectedUserLogin, done);
    store.dispatch(userSignup(fetchResponse)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(SET_CURRENT_USER);
      done();
    });
  });

  it('should dispatch SET_CURRENT_USER ACTION when userSigninAction is called', done => {
    fetchResponse.message = 'Login successful';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, expectedUserLogin, done);
    store.dispatch(userSignin(fetchResponse)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(SET_CURRENT_USER);
      done();
    });
  });
  it('should dispatch CREATE_PARCEL when parcelCreateOrder is called', done => {
    const expectedCreateParcel = [
      {
        type: CREATE_PARCEL
      }
    ];
    fetchResponse.message = 'Parcels created successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, expectedCreateParcel, done);
    store.dispatch(parcelCreateOrder(fetchResponse)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(CREATE_PARCEL);
      done();
    });
  });

  it('should dispatch LOAD_PARCEL_ORDER ACTION when loadParcel action is called', done => {
    const expectedLoadParcel = [
      {
        type: LOAD_PARCEL_ORDER
      }
    ];
    fetchResponse.message = 'Parcels retrieved successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, expectedLoadParcel, done);
    store.dispatch(loadParcel()).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(LOAD_PARCEL_ORDER);
      done();
    });
  });

  it('should dispatch CURRENT_PARCEL_ORDER ACTION when loadSingleParcel action is called', done => {
    const expectedSingleParcelParcel = [
      {
        type: CURRENT_PARCEL_ORDER
      }
    ];
    fetchResponse.message = 'Parcel retrieved successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, expectedSingleParcelParcel, done);
    store.dispatch(loadSingleParcel(parcelOrder[0].id)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(CURRENT_PARCEL_ORDER);
      done();
    });
  });

  it('should dispatch ADMIN_LOAD_SINGLE_PARCEL when adminLoadSingleParcel action is called', done => {
    const expectedAdminLoadParcel = [{ type: ADMIN_LOAD_SINGLE_PARCEL }];
    fetchResponse.message = 'Parcel retrieved successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, expectedAdminLoadParcel, done);
    store.dispatch(adminLoadSingleParcel(parcelOrder[0].id)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(ADMIN_LOAD_SINGLE_PARCEL);
      done();
    });
  });

  it('should dispatch LOAD_ALL_PARCEL_ORDER when loadAllParcel action is called', done => {
    const expectedLoadAllParcel = [
      {
        type: LOAD_ALL_PARCEL_ORDER
      }
    ];
    fetchResponse.message = 'Parcel retrieved successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, expectedLoadAllParcel, done);
    store.dispatch(loadAllParcel(parcelOrder[0].id)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(LOAD_ALL_PARCEL_ORDER);
      done();
    });
  });

  it('should dispatch UPDATE_DESTINATION when changeDestination action is called', done => {
    const expectedParcelDestination = [{ type: UPDATE_DESTINATION }];
    fetchResponse.message = 'Parcel destination changed successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, expectedParcelDestination, done);
    store.dispatch(changeDestination('akure', 4)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(UPDATE_DESTINATION);
      done();
    });
  });
  it('should dispatch UPDATE_DESTINATION when changeDestination action is called', done => {
    const expectedEmail = [];
    fetchResponse.message = 'Parcel destination changed successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, expectedEmail, done);
    store.dispatch(resetPasswordEmail('agare@gmail.com', 4)).then(() => {
      const action = store.getActions();
      expect(action).toEqual([]);
      done();
    });
  });

  it('should dispatch CANCEL_PARCEL_ORDER when cancelParcel action is called', done => {
    const cancelParcelAc = [
      {
        type: CANCEL_PARCEL_ORDER
      }
    ];
    fetchResponse.message = 'Parcel cancelled successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, cancelParcelAc, done);
    store.dispatch(cancelParcel(4)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(CANCEL_PARCEL_ORDER);
      done();
    });
  });

  it('should dispatch CHANGE_PARCEL_STATUS when changeStatus action is called', done => {
    const changeParcelStatus = [
      {
        type: CHANGE_PARCEL_STATUS
      }
    ];
    fetchResponse.message = 'Parcel Status Updated successfully and Email sent successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, changeParcelStatus, done);
    store.dispatch(changeStatus('transit',4)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(CHANGE_PARCEL_STATUS);
      done();
    });
  });

  it('should dispatch CHANGE_PARCEL_CURRENTLOCATION when changeStatus action is called', done => {
    const changeCurrentLocationAction = [
      {
        type: CHANGE_PARCEL_CURRENTLOCATION
      }
    ];
    
    fetchResponse.message = 'Parcel Location Updated successfully  and Email sent successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ user: {} }, changeCurrentLocationAction , done);
    store.dispatch(changeCurrentLocation('lagos',4)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(CHANGE_PARCEL_CURRENTLOCATION);
      done();
    });
  });
});


const changeParcelStatus = [
  {
    type: CHANGE_PARCEL_STATUS
  }
];


