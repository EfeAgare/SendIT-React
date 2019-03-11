import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer';
import LoginFooter from '../../components/LoginFooter'
import ProfileFooter from '../../components/ProfileFooter'


describe('Test Footer component', () => {
  it('Should render properly', done => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('footer').length).toEqual(1);
    expect(wrapper.find('footer .foot').length).toEqual(1);
    done();
  });
});

describe('Test LoginFooter component', () => {
  it('Should render properly', done => {
    const wrapper = shallow(<LoginFooter/>);
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('.footer-login').length).toEqual(1);
    expect(wrapper.find('.foot').length).toEqual(1);
    done();
  });
});

describe('Test ProfileFooter component', () => {
  it('it should render properly', done => {
    const wrapper = shallow(<ProfileFooter/>);
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('.footer-order').length).toEqual(1);
    expect(wrapper.find('.foot').length).toEqual(1);
    done();
  });
});