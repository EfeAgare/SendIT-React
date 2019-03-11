import React from 'react';
import { shallow } from 'enzyme';
import { SigninPage } from '../../components/SigninPage';
import  Header  from '../../components/Header';

let wrapper;

function userPage(args) {
  let defaultProps = {
    user: { name: '', role: '' },
    parcels: [],
    userSignin: jest.fn(),
    emailAction:jest.fn()
  };
  const props = { ...defaultProps, ...args };
  return shallow(<SigninPage {...props} />);
}
describe('Test UserPage Component', () => {
  beforeEach(() => {
    wrapper = userPage();
  });
  it('Should render properly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(<Header/>)).toEqual(true);
  
  });
});
