import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { Header, mapStateToProps } from '../../components/Header';
import { user } from '../ __mocks__/mockData';


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
    <Header
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
  let mockFn = jest.fn();

  it('Should render properly', () => {
    // const wrapper = homePage();
    expect(wrapper.exists()).toBe(true);
    expect(mapStateToProps(initialState).isAuthenticated).toBe();
    // expect(wrapper.find('Backdrop').length).toBe(1);
    expect(wrapper.find('div').length).toEqual(1);
    wrapper.setContext({ context: context.router.history });

    wrapper.instance().drawerToggleClickHandler(mockFn);
    wrapper.instance().backdropClickHandler(mockFn);

  });
});
