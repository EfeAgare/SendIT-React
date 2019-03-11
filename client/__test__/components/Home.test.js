import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/Home';

describe('Test Home component', () => {
  it('Should render properly', (done) => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div').length).toEqual(12);
  
    expect(wrapper.find('h1').length).toEqual(2);
    expect(wrapper.find('section').length).toEqual(1);
    expect(wrapper.find('a').length).toEqual(1);
    expect(wrapper.find('span').length).toEqual(2);
    expect(wrapper.find('.line').length).toEqual(2);
    expect(wrapper.find('.direction p').length).toEqual(4);
    expect(wrapper.find('.order-footer').length).toEqual(1);
    expect(wrapper.find('.order-footer a').length).toEqual(1);
    expect(wrapper.find('.order-footer p').length).toEqual(1);
    expect(wrapper.find('div Header').length).toEqual(0);
    expect(wrapper.find('Header').length).toEqual(0);
    expect(wrapper.find('#get-started').length).toEqual(1);
    done();
  });
});
