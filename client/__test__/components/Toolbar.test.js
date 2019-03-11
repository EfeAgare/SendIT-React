import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { user } from '../ __mocks__/mockData';
import ToolBar from '../../components/Toolbar/Toolbar';
import {

  parcelOrder,
  spyhandleDestinationChange
} from '../ __mocks__/mockData';

const context = { router: {} };
const historyMock = { push: jest.fn() };
const mockStore = configureMockStore();

let wrapper, store, initialState;

describe('Test Header Component', () => {
  // beforeEach(() => {
  initialState = {
    isAuthenticated: false,
    detail: { name: 'agare' }
  };
  store = mockStore(initialState);
  // Shallow render the container passing in the mock store
  wrapper = shallow(
    <ToolBar
      isAuthenticated={user.isAuthenticated}
      user={user}
      history={historyMock}
      store={store}
      context={context}
    />,
    {
      context
    }
  );
  // });

  it('Should render properly', () => {
    // const wrapper = homePage();
    expect(wrapper.exists()).toBe(true);
  
    expect(wrapper.find('Link').length).toEqual(1);
    expect(wrapper.find('header').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(5);
    expect(wrapper.find('.logo').length).toEqual(1);
    expect(wrapper.find('NavLink').length).toEqual(4);

    let context = { router: { history: '/' } };
    wrapper
      .find('NavLink')
      .at(1)
      .simulate('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        window.location.reload(true);
        context.router.history
      });
    wrapper.setContext({ context: context.router.history });
  });
});
