import React from 'react';
import { shallow } from 'enzyme';

import DrawerToggleButton from '../../components/SideDrawer/DrawerToggleButton';

describe('Test Footer component', () => {
  it('Should render properly', done => {
    const wrapper = shallow(<DrawerToggleButton />);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(3);
    done();
  });
});