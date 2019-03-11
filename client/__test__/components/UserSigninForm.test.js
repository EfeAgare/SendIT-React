import React from 'react';
import { shallow } from 'enzyme';
import { SigninForm } from '../../components/SigninForm';
import {
  user,
  event,
  spyUserSigninSuccess,
  parcelOrder
} from '../ __mocks__/mockData';

let wrapper;
let value='knowledge'
let mockFn = jest.fn();
// function UserSignInForm(args) {
//   let defaultProps = {
//     userSignin: jest.fn(),
//     emailAction: jest.fn()
//   };

//   const props = { ...defaultProps, ...args };
//   return shallow(<SigninForm {...props} />);
// }

describe('Test UserPage Component', () => {
  beforeEach(() => {
    wrapper = shallow(
      <SigninForm
        currentUser={user}
        userSignin={spyUserSigninSuccess}
        history={mockFn}
        emailAction={spyUserSigninSuccess}
      />
    )
  })
  it('Should render properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render state', () => {
    const input = wrapper.find('TextFieldGroup').at(1); 
    input.simulate('change', {
      target: { value: value },
    });
    expect(wrapper.state().email).toBe('');
    expect(wrapper.state().password).toBe('');
    expect(wrapper.state().error).toBe('');
    expect(wrapper.state().modalIsOpen).toBe(false);
    expect(wrapper.state().resetEmail).toBe('');
    expect(wrapper.state().modalState).toEqual({
      text: { color: '', message: '' }
    });
  });

  it('should render HTML element', () => {
    expect(wrapper.find('.sign-img').length).toEqual(1);
    expect(wrapper.find('.signin-text').length).toEqual(1);
    expect(wrapper.find('h1').length).toEqual(1);
    expect(wrapper.find('#messageText').length).toEqual(1);
    expect(wrapper.find('label').length).toEqual(2);
    expect(wrapper.find('p').length).toEqual(6);
    expect(wrapper.find('a').length).toEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('h1').text()).toEqual('Giving Customer Confidence');

    expect(wrapper.find('h1').text()).toEqual('Giving Customer Confidence');
    expect(wrapper.find('div').length).toEqual(3);
    wrapper
      .find('#forgot-pswd')
      .simulate('click', { preventDefault: jest.fn() });
    expect(wrapper.find('TextFieldGroup').length).toEqual(2);
    let textFieldProps = wrapper
      .find('TextFieldGroup')
      .at(0)
      .props();
    expect(textFieldProps.type).toBe('email');
    expect(textFieldProps.field).toEqual('email');
    expect(textFieldProps.value).toEqual('');
    let textFieldInput = wrapper.find('TextFieldGroup').at(0);
    textFieldInput.simulate('change', { target: { value: 'agare' } });
  });

  it('should handle change event', () => {
    wrapper.instance().handleChange = mockFn;
    wrapper
      .find('TextFieldGroup')
      .at(0)
      .props()
      .onChange(event);
  });

  it('should render order component', () => {
   
   
    wrapper.instance().openModal = mockFn;
    wrapper.instance().closeModal(event);
    wrapper.setState({
      modalIsOpen: false
    });

    wrapper.instance().sendEmail(mockFn,mockFn);
    wrapper.instance().onSubmit(event);
    wrapper.setProps({ userSignin: spyUserSigninSuccess });
    wrapper.instance().onSubmit(event);
    wrapper.setState({
      modalState: {
        text: { message: 'Processing...', color: 'lightblue' }
      }
    });

    wrapper.instance().closeModal(event);
    wrapper.setState({ modalIsOpen: true });
    expect(wrapper.state().modalIsOpen).toBe(true);

    wrapper.instance().openCancelModal = mockFn;
    wrapper.setState({ modalIsOpen: true });
    expect(wrapper.state().modalIsOpen).toBe(true);
  });
});
