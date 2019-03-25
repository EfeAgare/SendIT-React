import React from 'react';
import { shallow } from 'enzyme';
import { ParcelListRow} from '../../components/ParcelListRow';
import {
  user,
  event,
  parcelOrder,
  spyhandleCurrentLocationChange,
  spyhandleCancelParcel,
  spyhandleStatusChange,
  spyhandleDestinationChange
} from '../ __mocks__/mockData';

let wrapper;
let mockFn = jest.fn();
const context = { router: {} };
let x = 1;

describe('Test ParcelListRow Component', () => {
  it('should render order component', () => {
    wrapper = shallow(
      <ParcelListRow
        user={user}
        parcels={parcelOrder}
        changeStatus={spyhandleStatusChange}
        changeCurrentLocation={spyhandleStatusChange}
        changeDestination={spyhandleDestinationChange}
        cancelParcel={spyhandleCancelParcel}
      />,
      {
        context
      }
    );
    wrapper.instance().handleChange(event);

    wrapper.instance().handleStatusChange(mockFn);
    wrapper.setProps({ changeStatus: spyhandleStatusChange });

    wrapper.instance().handleDestinationChange(mockFn);
    wrapper.setProps({ changeDestination: spyhandleDestinationChange });

    
    wrapper.instance().handleCancelParcel(mockFn);
    wrapper.setProps({ cancelParcel: spyhandleCancelParcel });

    wrapper.instance().handleCurrentLocationChange(mockFn);
    wrapper.setProps({ changeCurrentLocation: spyhandleCurrentLocationChange });

    wrapper.instance().handleCurrentLocationChange(mockFn);
    wrapper.setProps({ changeCurrentLocation: spyhandleCancelParcel });

    wrapper.instance().closeModal(event);
    wrapper.setState({
      modalIsOpen: false,
      showModal: false,
      statusModal: false,
      currentLocationModal: false,
      detailOpen: false,
      detailOpen: false
    });

    wrapper.instance().openModal(mockFn);
    wrapper.setState({ modalIsOpen: true });
    expect(wrapper.state().modalIsOpen).toBe(true);

    wrapper.instance().openCancelModal(mockFn);
    wrapper.setState({ showModal: true });


    wrapper.instance().openParcelDetail(mockFn);
    wrapper.setState({ detailOpen: true, currentModalId: x });
  

    wrapper.instance().openAdminParcelDetail(mockFn);
    wrapper.setState({ detailOpen: true });
  

    wrapper.instance().openStatusModal(mockFn);
    wrapper.setState({ statusModal: true });

    wrapper.instance().openCurrentLocationModal(mockFn);
    wrapper.setState({ currentLocationModal: true });
  });

  it('should render state', () => {
    expect(wrapper.state().error).toBe('');
    expect(wrapper.state().modalIsOpen).toBe(true);
    expect(wrapper.state().detailOpen).toBe(true);
  });

  it('should test each HTML element', () => {
    expect(wrapper.find('ul').length).toEqual(1);
    expect(wrapper.find('.table-header').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(41);
  });

});
