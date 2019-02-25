import React, { Component } from 'react';
import '../../UI/css/allparcel.css';
import { CancelParcelOrder } from './CancelParcelOrder';
import { ChangeParcelDestination } from './ChangeParcelDestination';
import { Link } from 'react-router-dom';
import { dateFormat, newDateFormat } from './DateFormat';

class ParcelListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      modalIsOpen: false,
      showModal: false,
      deliveryAddress: '',
      modalState: {
        text: { message: '', color: '' }
      }
    };
    this.handleChange = this.handleChange.bind(this);

    this.openModal = this.openModal.bind(this);
    this.openCancelModal = this.openCancelModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  changeDestination() {
    this.props.userSignin(this.state).then(res => {
      res.message !== 'Login successful'
        ? this.setState({ error: res.errors || res.message })
        : this.props.history.push('/profile');
    });
  }
  cancelParcel() {
    this.props.userSignin(this.state).then(res => {
      res.message !== 'Login successful'
        ? this.setState({ error: res.errors || res.message })
        : this.props.history.push('/profile');
    });
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  openCancelModal() {
    this.setState({ showModal: true });
  }

  closeModal(event) {
    event.preventDefault();
    if (
      event.target.className === 'modal' ||
      event.target.className === 'close'
    )
      this.setState({ modalIsOpen: false });
    if (
      event.target.className === 'modal' ||
      event.target.className === 'close'
    )
      this.setState({ showModal: false });
  }

  render() {
    const { parcels} = this.props;
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
                  <div id="myDropdown" className="dropdown-content">
                    <p>OPTIONS</p>
                    <Link to="#" onClick={this.openCancelModal}>
                      Cancel Parcel
                    </Link>
                    <Link to="#" onClick={this.openModal}>
                      change destination
                    </Link>
                    <Link to="parceldetails.html?parcelid=${orderId}">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {this.state.showModal && (
              <CancelParcelOrder
                closeModal={this.closeModal}
                handleChange={this.handleChange}
                cancelParcel={this.cancelParcel}
                textMessage={this.state.modalState.text}
              />
            )}
            {this.state.modalIsOpen && (
              <ChangeParcelDestination
                closeModal={this.closeModal}
                changeDestination={this.changeDestination}
                handleChange={this.handleChange}
                textMessage={this.state.modalState.text}
                deliveryAddress={this.state.deliveryAddress}
              />
            )}
          </li>
        ))}
      </ul>
    );
  }
}

export default ParcelListRow;
