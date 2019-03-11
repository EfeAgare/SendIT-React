import React from 'react';
import { shallow } from 'enzyme';
import { ParcelDetailPage } from '../../components/ParcelDetailPage';
import {
  user,
  parcelOrder,spyLoadParcelSuccess,spyhandleDestinationChange
} from '../ __mocks__/mockData';

let mockFn = jest.fn();
const textMessage = {
  message: ''
};
const match = {  params: parcelOrder[0].id} ;

describe('Test UserPage Component', () => {
  it('should render order component', () => {
    const wrapper = shallow(
      <ParcelDetailPage
        textMessage={textMessage}
        user={user}
        currentParcel={parcelOrder[0]}
        parcels={parcelOrder}
        loadSingleParcel={spyLoadParcelSuccess}
        parcelId={parcelOrder[0].id}
        closeModal={mockFn}
        match={match}
        adminLoadSingleParcel={ spyhandleDestinationChange}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').length).toEqual(21);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('li').length).toEqual(12);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('button').text()).toEqual('Back');
    
    expect(wrapper.find('main').length).toEqual(1);
    expect(wrapper.find('label').length).toEqual(11);
    expect(wrapper.find('a').text()).toEqual('Number of Parcels Order3');
    wrapper.instance().componentDidMount()
    wrapper.setProps({
      loadSingleParcel: spyLoadParcelSuccess,
    })
    wrapper.setProps({
      adminLoadSingleParcel: spyhandleDestinationChange,
    })
   
  });
});
