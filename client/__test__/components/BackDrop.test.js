import React from 'react';
import { shallow } from 'enzyme';
import { user } from '../ __mocks__/mockData';

import Backdrop from '../../components/Backdrop/Backdrop';

describe('Test Footer component', () => {
  it('Should render properly', done => {
    const wrapper = shallow(
      <Backdrop />
    );;
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('.backdrop').length).toEqual(1);
    
    done();
  });
});
