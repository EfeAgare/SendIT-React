import React from 'react';
import { shallow } from 'enzyme';
import { ChangeParcelDestination } from '../../components/ChangeParcelDestination';
import {
  parcelOrder,
  spyhandleDestinationChange
} from '../ __mocks__/mockData';

let mockFn = jest.fn();
const textMessage = {
  message: ''
};
let deliveryAddress = 'address';

describe('Test UserPage Component', () => {
  it('should render order component', () => {
    const wrapper = shallow(
      <ChangeParcelDestination
        textMessage={textMessage}
        handleDestinationChange={spyhandleDestinationChange}
        parcelId={parcelOrder[0].id}
        closeModal={mockFn}
        deliveryAddress={deliveryAddress}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').length).toEqual(4);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('button').text()).toEqual('Submit');
    expect(wrapper.find('h4').text()).toEqual('Change Parcel Destination');
    wrapper.find('button').simulate('click', {
      spyhandleDestinationChange
    });
    wrapper.find('div').at(2).simulate('click', {
      spyhandleDestinationChange
    });
  });
});
