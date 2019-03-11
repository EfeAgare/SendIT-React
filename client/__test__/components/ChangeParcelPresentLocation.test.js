import React from 'react';
import { shallow } from 'enzyme';
import { ChangeParcelPresentLocation } from '../../components/ChangeParcelPresentLocation';
import {
  parcelOrder,
  spyhandleCurrentLocationChange
} from '../ __mocks__/mockData';

let mockFn = jest.fn();
const textMessage = {
  message: ''
};
let status = 'transit';

describe('Test ChangeParcelPresentLocation Component', () => {
  it('should render order component', () => {
    const wrapper = shallow(
      <ChangeParcelPresentLocation
        textMessage={textMessage}
        handleCurrentLocationChange={spyhandleCurrentLocationChange}
        parcelId={parcelOrder[0].id}
        closeModal={mockFn}
        status ={status}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').length).toEqual(4);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('i').length).toEqual(1);
    expect(wrapper.find('h4').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('button').text()).toEqual('Submit');
    expect(wrapper.find('h4').text()).toEqual('Change Location');
    wrapper.find('button').simulate('click', {
      spyhandleCurrentLocationChange
    });
  });
});
