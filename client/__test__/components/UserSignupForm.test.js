import React from 'react';
import { shallow } from 'enzyme';
import { SignupForm } from '../../components/SignupForm';
import { spyUserSignupFailure, event } from '../ __mocks__/mockData';

let wrapper;
let mockFn = jest.fn();

describe('Test UserPage Component', () => {
  beforeEach(() => {
    wrapper = shallow(
      <SignupForm userSignup={spyUserSignupFailure} handleChange={mockFn} />
    );
  });
  it('Should render properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render state', () => {
    expect(wrapper.state().username).toBe('');
    expect(wrapper.state().lastname).toBe('');
    expect(wrapper.state().email).toBe('');
    expect(wrapper.state().password).toBe('');
    expect(wrapper.state().passwordConfirmation).toBe('');
    expect(wrapper.state().errors).toBe('');
    expect(wrapper.state().errors).toBe('');
  });

  it('should render HTML element', () => {
    expect(wrapper.find('.header-clear').length).toEqual(1);
    expect(wrapper.find('.input-section').length).toEqual(1);
    expect(wrapper.find('hr').length).toEqual(1);
    expect(wrapper.find('#messageText').length).toEqual(2);
    expect(wrapper.find('label').length).toEqual(5);
    expect(wrapper.find('a').text()).toEqual('Create Your Account');
    expect(wrapper.find('p').length).toEqual(3);
    expect(wrapper.find('div').length).toEqual(2);

    expect(wrapper.find('TextFieldGroup').length).toEqual(5);

    let textFieldProps = wrapper
      .find('TextFieldGroup')
      .at(0)
      .props();
    expect(textFieldProps.type).toBe('text');
    expect(textFieldProps.field).toEqual('username');
    expect(textFieldProps.value).toEqual('');
    let textFieldInput = wrapper.find('TextFieldGroup').at(0);
    textFieldInput.simulate('change', { target: { value: 'agare' } });
  });

  it('should handle change event', () => {
    wrapper.instance().handleChange = mockFn;
    wrapper.setProps({ handleChange: spyUserSignupFailure });
    wrapper
      .find('TextFieldGroup')
      .at(0)
      .props()
      .onChange(event);
    wrapper.instance().onSubmit(event);
    wrapper.setProps({ userSignup: spyUserSignupFailure });
  });
});
