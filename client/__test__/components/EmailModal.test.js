import React from 'react';
import { shallow } from 'enzyme';
import { EmailModalForgottenPassword } from '../../components/EmailModalForgottenPassword';
import {
  parcelOrder,
  spyhandleStatusChange
} from '../ __mocks__/mockData';

let mockFn = jest.fn();
const textMessage = {
  message: ''
};
let status = 'transit';

describe('Test EmailModalForgottenPassword Component', () => {
  it('should render order component', () => {
    const wrapper = shallow(
      <EmailModalForgottenPassword
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
    expect(wrapper.find('h4').text()).toEqual('Password Recovery');
    expect(wrapper.find('p').text()).toEqual('Provide your registered email to reset your password');
    wrapper.find('button').simulate('click', {
      spyhandleStatusChange
    });
  });
});
