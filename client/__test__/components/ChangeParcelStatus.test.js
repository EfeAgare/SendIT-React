import React from 'react';
import { shallow } from 'enzyme';
import { ChangeParcelStatus } from '../../components/ChangeParcelStatus';
import {
  parcelOrder,
  spyhandleStatusChange
} from '../ __mocks__/mockData';

let mockFn = jest.fn();
const textMessage = {
  message: ''
};
let status = 'transit';

describe('Test ChangeParcelStatus Component', () => {
  it('should render order component', () => {
    const wrapper = shallow(
      <ChangeParcelStatus
        textMessage={textMessage}
        handleStatusChange={spyhandleStatusChange}
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
    expect(wrapper.find('h4').text()).toEqual('Change Status');
    wrapper.find('button').simulate('click', {
      spyhandleStatusChange
    });
  });
});
