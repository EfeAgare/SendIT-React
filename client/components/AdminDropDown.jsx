import React from 'react';
import { Link } from 'react-router-dom';
import { ChangeParcelStatus } from './ChangeParcelStatus';
import { ChangeParcelPresentLocation } from './ChangeParcelPresentLocation';

export const AdminDropDown = ({
  openStatusModal,
  openAdminParcelDetail,
  closeModal,
  statusModal,
  openCurrentLocationModal,
  handleChange,
  currentLocation,
  textMessage,
  currentModalId,
  handleCurrentLocationChange,
  currentLocationModal,
  status,
  parcels,
  handleStatusChange
}) => (
  <React.Fragment>
    {parcels.map(parcel => (
      <div id="myDropdown" key={parcel.id} className="dropdown-content">
        <p>OPTIONS</p>
        <Link to="#" onClick={openCurrentLocationModal}>
          Change Location
        </Link>
        <Link to="#" onClick={openStatusModal}>
          Change Status
        </Link>
        {currentModalId  && (
          <Link
            to={`/viewdetails/${currentModalId}`}
            onClick={openAdminParcelDetail}
          >
            View Details
          </Link>
        )}
        {statusModal && currentModalId === parcel.id && (
          <ChangeParcelStatus
            closeModal={closeModal}
            parcelId={parcel.id}
            status={status}
            handleChange={handleChange}
            textMessage={textMessage}
            handleStatusChange={handleStatusChange}
          />
        )}
        {currentLocationModal && currentModalId === parcel.id && (
          <ChangeParcelPresentLocation
            closeModal={closeModal}
            parcelId={parcel.id}
            currentLocation={currentLocation}
            handleChange={handleChange}
            textMessage={textMessage}
            handleCurrentLocationChange={handleCurrentLocationChange}
          />
        )}
      </div>
    ))}
  </React.Fragment>
);
