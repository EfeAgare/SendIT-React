import React from 'react';
import { shallow } from 'enzyme';
import { AdminDropDown } from '../../components/AdminDropDown';
import {
  parcelOrder,
  spyhandleDestinationChange
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
      <AdminDropDown
        parcels={parcelOrder}
        handleDestinationChange={spyhandleDestinationChange}
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
    expect(wrapper.find('Link').length).toEqual(9);
  });
});
