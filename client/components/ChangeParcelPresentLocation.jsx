import React from 'react';
import '../../UI/css/allparcel.css';

export const ChangeParcelPresentLocation = ({
  closeModal,
  parcelId,
  handleCurrentLocationChange,
  handleChange,
  textMessage,
  currentLocation
}) => {
  return(
  <div onClick={closeModal} className="modal">
    <div className="modal-content clearfix">
      <div onClick={closeModal} className="close">
        &times;
      </div>
      <h4>Change Location</h4>
      <div className="dest-container">
        <form>
          &nbsp;
          <i className="fa fa-user" />
          &nbsp;{' '}
          <input
            type="text"
            id="dest-input"
            placeholder="currentLocation"
            name="currentLocation"
            value={currentLocation}
            onChange={handleChange}
            autoFocus
          />
          <button
            id="dest-btn"
            type="submit"
            onClick={() => handleCurrentLocationChange(parcelId)}
          >
            Submit
          </button>
        </form>
      </div>
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
    </div>
  </div>
)}
;
