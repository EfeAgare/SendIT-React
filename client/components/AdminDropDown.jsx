import React from 'react';
import { Link } from 'react-router-dom';
import { ChangeParcelStatus } from './ChangeParcelStatus';

export const AdminDropDown = ({
  openStatusModal,
  detailOpen,
  closeModal,
  showDetail,
  handleChange,
  textMessage,
  currentModalId,
  status,
  parcels,
  handleStatusChange
}) => (
  <React.Fragment>
    {parcels.map(parcel => (
      <div id="myDropdown" key={parcel.id} className="dropdown-content">
        <p>OPTIONS</p>
        <Link to="#">Change Location</Link>
        <Link to="#" onClick={openStatusModal}>
          Change Status
        </Link>
        <Link to={`/viewdetails/${parcel.id}`} onClick={detailOpen}>
          View Details
        </Link>
        {showDetail &&
          currentModalId ===
            parcel.id && (
              <ChangeParcelStatus
                closeModal={closeModal}
                parcelId={parcel.id}
                status={status}
                handleChange={handleChange}
                textMessage={textMessage}
                handleStatusChange={handleStatusChange}
              />
            )}
      </div>
    ))}
  </React.Fragment>
);
