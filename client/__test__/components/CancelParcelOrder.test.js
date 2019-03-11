import React from 'react';
import { shallow } from 'enzyme';
import { CancelParcelOrder } from '../../components/CancelParcelOrder';
import {
  parcelOrder,
  spyhandleCancelParcel
} from '../ __mocks__/mockData';

let mockFn = jest.fn();
let currentLocation = 'address';
let currentModalId = parcelOrder[0].id;

let textMessage = {
  text: { message: '', color: '' }
};
describe('Test UserPage Component', () => {
  it('should render order component', () => {
    const wrapper = shallow(
      <CancelParcelOrder
        parcels={parcelOrder}
        handleCancelParcel={spyhandleCancelParcel}
        parcelId={parcelOrder[0].id}
        closeModal={mockFn}
        statusModal={mockFn}
        handleChange={mockFn}
        status={'delivered'}
        textMessage={textMessage}
        currentModalId={currentModalId}
        currentLocation={currentLocation}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').length).toEqual(3);
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('h4').text()).toEqual('Cancel Parcel Order');
    expect(wrapper.find('p').text()).toEqual('Are You Really sure You want to cancel the Parcel Order');
    wrapper.find('button').simulate('click', {
      spyhandleCancelParcel
    });
  });
});
