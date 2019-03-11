import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../../UI/css/allparcel.css';
import { CancelParcelOrder } from './CancelParcelOrder';
import { ChangeParcelDestination } from './ChangeParcelDestination';
import { Link } from 'react-router-dom';
import { dateFormat, newDateFormat } from './DateFormat';
import { cancelParcel } from '../action/cancelParcelAction';
import { changeStatus } from '../action/changeParcelStatus';
import { changeCurrentLocation } from '../action/changeCurrentLocation';
import { changeDestination } from '../action/parcelDestinationAction';
import ParcelDetailPage from './ParcelDetailPage';
import { connect } from 'react-redux';
import { AdminDropDown } from './AdminDropDown';

export class ParcelListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      modalIsOpen: false,
      showModal: false,
      detailOpen: false,
      statusModal: false,
      currentLocationModal: false,
      currentModalId: 0,
      status: '',
      currentLocation: '',
      deliveryAddress: ' ',
      modalState: {
        text: { message: '', color: '' }
      }
    };
    this.handleChange = this.handleChange.bind(this);
    // this.openModal = this.openModal.bind(this);
    this.openCancelModal = this.openCancelModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCancelParcel = this.handleCancelParcel.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.openStatusModal = this.openStatusModal.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleCurrentLocationChange = this.handleCurrentLocationChange.bind(
      this
    );
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  handleDestinationChange(parcelId) {
    const { modalState, deliveryAddress } = this.state;
    this.setState({
      modalState: {
        ...modalState,
        text: { message: 'Processing...', color: 'lightblue' }
      }
    });
    this.props.changeDestination(deliveryAddress, parcelId).then(res => {
      if (res.message === 'Parcel destination changed successfully') {
        this.setState({
          modalState: {
            ...modalState,
            text: { message: res.message, color: 'green' }
          }
        });
      } else {
        this.setState({
          modalState: {
            ...modalState,
            text: { message: res.message || res.errors, color: 'tomato' }
          }
        });
      }
    });
  }

  handleStatusChange(parcelId) {
    const { modalState, status } = this.state;
    this.setState({
      modalState: {
        ...modalState,
        text: { message: 'Processing...', color: 'lightblue' }
      }
    });
    this.props.changeStatus(status, parcelId).then(res => {
      if (
        res.message ===
        'Parcel Status Updated successfully and Email sent successfully'
      ) {
        this.setState({
          modalState: {
            ...modalState,
            text: { message: res.message, color: 'green' }
          }
        });
      } else {
        this.setState({
          modalState: {
            ...modalState,
            text: { message: res.message || res.errors, color: 'tomato' }
          }
        });
      }
    });
  }

  handleCancelParcel(parcelId) {
    const { modalState } = this.state;
    this.setState({
      modalState: {
        ...modalState,
        text: { message: 'Processing...', color: 'lightblue' }
      }
    });
    this.props.cancelParcel(parcelId).then(res => {
      if (res.message === 'Parcel cancelled successfully') {
        this.setState({
          modalState: {
            ...modalState,
            text: { message: res.message, color: 'green' }
          }
        });
      } else {
        this.setState({
          modalState: {
            ...modalState,
            text: { message: res.message || res.errors, color: 'tomato' }
          }
        });
      }
    });
  }

  handleCurrentLocationChange(parcelId) {
    const { modalState, currentLocation } = this.state;
    this.setState({
      modalState: {
        ...modalState,
        text: { message: 'Processing...', color: 'lightblue' }
      }
    });
    this.props.changeCurrentLocation(currentLocation, parcelId).then(res => {
      if (
        res.message ===
        'Parcel Location Updated successfully  and Email sent successfully'
      ) {
        this.setState({
          modalState: {
            ...modalState,
            text: { message: res.message, color: 'green' }
          }
        });
      } else {
        this.setState({
          modalState: {
            ...modalState,
            text: { message: res.message || res.errors, color: 'tomato' }
          }
        });
      }
    });
  }

  // modals to open

  openModal(x) {
    this.setState({ modalIsOpen: true, currentModalId: x });
  }
  openCancelModal(x) {
    this.setState({ showModal: true, currentModalId: x });
  }
  openParcelDetail(x) {
    this.setState({ detailOpen: true, currentModalId: x });
  }
  openAdminParcelDetail(x) {
    this.setState({ detailOpen: true, currentModalId: x });
  }
  openStatusModal(x) {
    this.setState({ statusModal: true, currentModalId: x });
  }

  openCurrentLocationModal(x) {
    this.setState({ currentLocationModal: true, currentModalId: x });
  }

  closeModal(event) {
    event.preventDefault();
    if (
      event.target.className === 'modal' ||
      event.target.className === 'close'
    ) {
      this.setState({
        modalIsOpen: false,
        showModal: false,
        statusModal: false,
        currentLocationModal: false,
        detailOpen: false,
        detailOpen: false
      });
    }
  }

  render() {
    const { parcels, currentParcel, isLoading, user } = this.props;
    const { currentModalId } = this.state;
    return (
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">ORDER Date</div>
          <div className="col col-2">Name</div>
          <div className="col col-3">Current Location</div>
          <div className="col col-4">Destination</div>
          <div className="col col-5">Delivery date</div>
          <div className="col col-6">Price(₦)</div>
          <div className="col col-7">Status</div>
          <div className="col col-8" />
        </li>

        {parcels.map(parcel => (
          <li key={parcel.id} className="table-row">
            <div className="col col-1" data-label="Order Date: " id="date">
              {dateFormat(parcel.registered)}
            </div>
            <div className="col col-2" data-label="Customer Name:" id="name">
              {parcel.name}
            </div>
            <div
              className="col col-3"
              data-label="Pickup Address:"
              id="pickup-address"
            >
              {parcel.pickupaddress}{' '}
            </div>
            <div
              className="col col-4"
              data-label="Destination: "
              id="destination"
            >
              {parcel.deliveryaddress}{' '}
            </div>
            <div
              className="col col-5"
              data-label="DeliveryDate: "
              id="delivery-date"
            >
              {newDateFormat(parcel.registered)}
            </div>
            <div className="col col-6" data-label="Price: " id="price">
              {parcel.itemweight * parcel.itemquantity * 700}
            </div>
            <div className="col col-7" data-label="Status:" id="status">
              {parcel.status}{' '}
            </div>
            <div className="col col-8" data-label="options">
              <div className="dropdown">
                <div className="dropbtn">
                  {/* Check if user is an admin */}
                  {user.detail.role === 'admin' ? (
                    <AdminDropDown
                      openStatusModal={this.openStatusModal.bind(
                        this,
                        parcel.id
                      )}
                      openCurrentLocationModal={this.openCurrentLocationModal.bind(
                        this,
                        parcel.id
                      )}
                      currentModalId={parcel.id}
                      openAdminParcelDetail={this.openAdminParcelDetail.bind(
                        this,
                        parcel.id
                      )}
                      currentLocation={this.state.currentLocation}
                      closeModal={this.closeModal}
                      statusModal={this.state.statusModal}
                      parcels={parcels}
                      handleStatusChange={this.handleStatusChange}
                      handleCurrentLocationChange={
                        this.handleCurrentLocationChange
                      }
                      handleChange={this.handleChange}
                      currentLocationModal={this.state.currentLocationModal}
                      textMessage={this.state.modalState.text}
                      status={this.state.status}
                    />
                  ) : (
                    <div id="myDropdown" className="dropdown-content">
                      <p>OPTIONS</p>
                      {/* this.openCancelModal.bind(this, parcel.id) is to bind to the particular parcel order */}
                      <Link
                        to="#"
                        onClick={this.openCancelModal.bind(this, parcel.id)}
                      >
                        Cancel Parcel
                      </Link>
                      <Link
                        to="#"
                        onClick={this.openModal.bind(this, parcel.id)}
                      >
                        change destination
                      </Link>
                      <Link
                        to={`/viewdetails/${parcel.id}`}
                        onClick={this.openParcelDetail}
                      >
                        View Details
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* {this.state.showModal && currentModalId == parcel.id  is to only display that particular order*/}
            {this.state.showModal && currentModalId == parcel.id && (
              <CancelParcelOrder
                parcelId={parcel.id}
                closeModal={this.closeModal}
                handleChange={this.handleChange}
                textMessage={this.state.modalState.text}
                handleCancelParcel={this.handleCancelParcel}
              />
            )}
            {this.state.modalIsOpen && currentModalId == parcel.id && (
              <ChangeParcelDestination
                closeModal={this.closeModal}
                parcelId={parcel.id}
                handleDestinationChange={this.handleDestinationChange}
                handleChange={this.handleChange}
                textMessage={this.state.modalState.text}
                deliveryAddress={this.state.deliveryAddress}
              />
            )}
            {isLoading ? (
              <div className="loader" />
            ) : (
              this.state.detailOpen && (
                <ParcelDetailPage
                  currentParcel={currentParcel}
                  parcels={this.props.parcels}
                />
              )
            )}
          </li>
        ))}
      </ul>
    );
  }
}
ParcelListRow.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentParcel: state.parcel,
    // user: state.user,
    parcels: state.parcels
  };
};

export default connect(
  mapStateToProps,
  { changeDestination, cancelParcel, changeStatus, changeCurrentLocation }
)(ParcelListRow);
