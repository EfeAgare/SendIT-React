import React from 'react';
import '../../UI/css/allparcel.css';

export const ChangeParcelStatus = ({
  closeModal,
  parcelId,
  handleStatusChange,
  handleChange,
  textMessage,
  status
}) => (
  <div onClick={closeModal} className="modal">
    <div className="modal-content clearfix">
      <div onClick={closeModal} className="close">
        &times;
      </div>
      <h4>Change Status</h4> 
      <div className="dest-container">
        <form>
          &nbsp;
          <i className="fa fa-user" />
          &nbsp;{' '}
          <input
            type="text"
            id="dest-input"
            placeholder="Change Status"
            name="status"
            value={status}
            onChange={handleChange}
            autoFocus
          />
          <button
            id="dest-btn"
            type="submit"
            onClick={() => handleStatusChange(parcelId)}
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
);
