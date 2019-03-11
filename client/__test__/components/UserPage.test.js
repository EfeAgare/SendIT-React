import React from 'react';
import { shallow } from 'enzyme';
import { UserPage } from '../../components/UserPage';

let wrapper;

function userPage(args) {
  let defaultProps = {
    user: { detail: { name: '', role: '' } },
    parcels: [],
    loadParcel: () => {}
  };
  const props = { ...defaultProps, ...args };
  return shallow(<UserPage {...props} />);
}
describe('Test UserPage Component', () => {
  beforeEach(() => {
    wrapper = userPage();
  });
  it('Should render properly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.state().isLoading).toBe(false);
  });

  it('should render sub-components', () => {
    expect(wrapper.find('UserDisplayPage')).toHaveLength;
    expect(wrapper.find('ProfileFooter').length).toEqual(1);
  });
});
