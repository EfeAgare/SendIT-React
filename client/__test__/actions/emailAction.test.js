import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import { CURRENT_PARCEL_ORDER,LOAD_ALL_PARCEL_ORDER,LOAD_PARCEL_ORDER } from '../../constants/action-types';
import { loadParcelOrder,loadAllParcelOrder, singleParcelOrder } from '../../action/loadParcelAction';
import { parcelOrder } from '../ __mocks__/mockData';

// Test a sync action
describe('Parcel Actions', () => {
  describe('Get a single Parcel', () => {
    it('should get a single parcel order', () => {
      //arrange
      const parcel = parcelOrder[0];
      const expectedAction = {
        type: CURRENT_PARCEL_ORDER,
        parcel: parcel
      };

      //act
      const action = singleParcelOrder(parcel);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });

  describe('Laod all Parcel Order', () => {
    it('should load all parcel order', () => {
      //arrange
      const parcels = parcelOrder;
      const expectedAction = {
        type:  LOAD_ALL_PARCEL_ORDER,
        allparcels: parcels
      };

      //act
      const action = loadAllParcelOrder(parcels);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });

  describe('Laod all Parcel Order', () => {
    it('should load all parcel order', () => {
      //arrange
      const parcels = parcelOrder;
      const expectedAction = {
        type:  LOAD_PARCEL_ORDER,
        parcels: parcels
      };

      //act
      const action = loadParcelOrder(parcels);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});
