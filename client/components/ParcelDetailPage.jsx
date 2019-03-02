import '../../UI/css/allparcel.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  loadSingleParcel,
  adminLoadSingleParcel
} from '../action/loadParcelAction';
import Header from './Header';
import ProfileFooter from './ProfileFooter';
import { dateFormat } from './DateFormat';

class ParcelDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    const {
      loadSingleParcel,
      adminLoadSingleParcel,
      user,
      match: { params }
    } = this.props;
    if (user.detail.role === 'admin') {
      adminLoadSingleParcel(params.parcelId);
    }
    loadSingleParcel(params.parcelId);
  }
  render() {
    const { currentParcel, parcels, user } = this.props;
    return (
      <React.Fragment>
        <Header />
        <div id="content-parceldetail">
          <aside>
            <div className="aside">
              <div className="imagerow">
                <div className="small-12 medium-2 large-2 columns">
                  <div className="circle">
                    <img className="profile-pic man-image" src="" />
                  </div>
                  <div className="p-image">
                    <i className="fa fa-camera upload-button"> </i>
                    <input
                      className="file-upload"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              <p className="my" />
              <p className="myname" />
              {user.detail.name}
              <a href="profile.html" className="number-order">
                Number of Parcels Order
                <div id="number-order-parcel" className="number-order" />
                {parcels.length}
              </a>
            </div>
          </aside>
          <main>
            <h3 className="order-title"> Order Details</h3>
            <div className="form-container">
              <div className="container">
                <div className="messageText" />
                <form>
                  <ul className="flex-outer">
                    <li>
                      <label htmlFor="name">Name: </label>
                      <div id="name"> {currentParcel.name}</div>
                    </li>
                    <li>
                      <label htmlFor="delivery-address">
                        Delivery Address:{' '}
                      </label>
                      <div id="delivery-address">
                        {currentParcel.deliveryaddress}
                      </div>
                    </li>
                    <li>
                      <label htmlFor="phone-number">Phone Number: </label>
                      <div id="phone-number">
                        {' '}
                        {currentParcel.deliverypnumber}
                      </div>
                    </li>
                    <li>
                      <label htmlFor="pick-up">PickUp Address:</label>
                      <div id="pick-up"> {currentParcel.pickupaddress}</div>
                    </li>
                    <li>
                      <label htmlFor="item-name">Current Location:</label>
                      <div id="current-location">
                        {currentParcel.currentlocation}{' '}
                      </div>
                    </li>
                    <li>
                      <label htmlFor="item-description">
                        Item Description:
                      </label>
                      <div id="item-description">
                        {currentParcel.itemquantity}
                      </div>
                    </li>
                    <li>
                      <label htmlFor="item-weight">Item Weight (Kg):</label>
                      <div id="item-weight">{currentParcel.itemweight}</div>
                    </li>
                    <li>
                      <label htmlFor="item-quantity">Item Quantity:</label>
                      <div id="item-quantity">
                        {currentParcel.itemquantity}{' '}
                      </div>
                    </li>
                    <li>
                      <label htmlFor="price">Price:</label>₦
                      <div id="price">
                        {currentParcel.itemweight *
                          currentParcel.itemquantity *
                          700}
                      </div>
                    </li>
                    <li>
                      <label htmlFor="price">Order Date:</label>
                      <div id="date">
                        {dateFormat(currentParcel.registered)}
                      </div>
                    </li>
                    <li>
                      <label htmlFor="status">Status:</label>
                      <div id="status">{currentParcel.status}</div>
                    </li>
                    <li>
                      <Link to="/profile">
                        {' '}
                        <button id="detail-btn" type="submit">
                          Back
                        </button>
                      </Link>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </main>
        </div>
        <ProfileFooter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentParcel: state.currentParcel,
  parcels: state.parcels,
  user: state.user
});

export default connect(
  mapStateToProps,
  { loadSingleParcel, adminLoadSingleParcel }
)(ParcelDetailPage);
