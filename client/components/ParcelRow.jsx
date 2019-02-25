import React from 'react';
import '../../UI/css/order.css';
import '../../UI/css/allparcel.css';
const dateFormat = oldDate => {
  const date = new Date(oldDate);
  return date.toLocaleDateString();
};

const newDateFormat = newDate => {
  const date = new Date(newDate);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let newdate = new Date();
  newdate.setFullYear(year, month, day + 10);
  return newdate.toLocaleDateString();
};

const ParcelRow = ({ parcel }) => {
  const orderId = parcel.id;
  return (
    <div>
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
      <div className="col col-4" data-label="Destination: " id="destination">
        {parcel.deliveryaddress}{' '}
      </div>
      <div className="col col-5" data-label="DeliveryDate: " id="delivery-date">
        {newDateFormat(parcel.registered)}
      </div>
      <div className="col col-6" data-label="Price: " id="price">
        {parcel.itemweight * parcel.itemquantity * 200}
      </div>
      <div className="col col-7" data-label="Status:" id="status">
        {parcel.status}{' '}
      </div>
      <div className="col col-8" data-label="options">
        <div className="dropdown">
          <div className="dropbtn">
            <div id="myDropdown" className="dropdown-content">
              <p>OPTIONS</p>
              {/* <a href="#" onClick={cancelparcel(orderId)}>
                Cancel Parcel
              </a>
              <a href="#" onClick={changeDestination(orderId)}>
                change destination
              </a> */}
              <a href="parceldetails.html?parcelid=${orderId}">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelRow;
