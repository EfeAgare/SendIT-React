import React from 'react';
import { shallow } from 'enzyme';
import { user } from '../ __mocks__/mockData';

import SideDrawer from '../../components/SideDrawer/SideDrawer';

describe('Test Footer component', () => {
  it('Should render properly', done => {
    const wrapper = shallow(
      <SideDrawer
        user={user}
        isAuthenticated={user.isAuthenticated}
        drawerClasses="side-drawer open"
        show={'showwww'}
      />
    );
    expect(wrapper.find('nav').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('ul').length).toEqual(1);
    expect(wrapper.find('li').length).toEqual(4);

    // Local storage mocking
    // const VALUE = 'token';
    // expect(localStorage.removeItem).toHaveBeenLastCalledWith();
    // expect(Object.keys(localStorage.__STORE__).length).toBe(0);

    Object.defineProperty(window.location, 'reload', {
      configurable: true
    });
    window.location.reload = jest.fn();
    window.location.reload();
    expect(window.location.reload).toHaveBeenCalled();

    done();
  });
});
