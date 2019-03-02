import React from 'react';
import '../../UI/css/allparcel.css';

export const CancelParcelOrder = ({
  closeModal,
  handleCancelParcel,
  textMessage,
  parcelId
}) => (
  <div onClick={closeModal} className="modal">
    <div className="modal-content clearfix">
      <div onClick={closeModal} className="close">
        &times;
      </div>
      <h4>Cancel Parcel Order</h4>
      <p>Are You Really sure You want to cancel the Parcel Order</p>
      {textMessage.message && (
        <p
          id="modal-messageText"
          style={{
            color: textMessage.color,
            fontSize: 12,
            textAlign: 'center'
          }}
          className="text-center"
        >
          {textMessage.message}
        </p>
      )}
      <button
        id="modal-btn"
        onClick={() => handleCancelParcel(parcelId)}
        type="submit"
      >
        Submit
      </button>
    </div>
  </div>
);
