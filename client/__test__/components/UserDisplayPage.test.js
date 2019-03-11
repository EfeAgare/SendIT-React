import React from 'react';
import { shallow } from 'enzyme';
import { UserDisplayPage } from '../../components/UserDisplayPage';

function userDisplayPage(args) {
  let defaultProps = {
    user: { detail: { name: '', role: '' } },
    parcels: []
  };
  const isLoading = true;
  const props = { ...defaultProps, ...args, isLoading };
  return shallow(<UserDisplayPage {...props} />);
}
describe('Test userDisplayPage Component', () => {
  it('Should render properly', () => {
    const wrapper = userDisplayPage();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#content').length).toEqual(1);
    expect(wrapper.find('.aside').length).toEqual(1);
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('.imagerow').length).toEqual(1);
    expect(wrapper.find('.wrapper').length).toEqual(1);
    expect(wrapper.find('.loader').length).toEqual(1);
    expect(wrapper.find('main').length).toEqual(1);
    expect(wrapper.find('.text-center').length).toEqual(1);
    expect(wrapper.find('h1').text()).toEqual('Parcel Delivery Order');
    expect(wrapper.find('p').length).toEqual(3);
    expect(wrapper.find('#number-order-parcel').length).toEqual(1);
    expect(wrapper.find('p').length).toEqual(3);
    expect(wrapper.find('div').length).toEqual(11);
    expect(wrapper.find('div').length).toEqual(11);
    expect(wrapper.find('div').length).toEqual(11);
    expect(wrapper.state().currentPage).toEqual(1);
    expect(wrapper.state().parcelsPage).toEqual(10);
  });
});
