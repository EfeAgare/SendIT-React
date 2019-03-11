import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage } from '../../components/SignupPage';

let wrapper;

function userPage(args) {
  let defaultProps = {
    user: { detail: { name: '', role: '' } },
    parcels: [],
    userSignup: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return shallow(<SignupPage {...props} />);
}
describe('Test UserPage Component', () => {
  beforeEach(() => {
    wrapper = userPage();
  });
  it('Should render properly', () => {
    expect(wrapper.exists()).toBe(true);
  
  });
});
