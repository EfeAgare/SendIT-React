import React from 'react';
import '../../UI/css/sign.css';

export const EmailModalForgottenPassword = ({
  closeModal,
  sendEmail,
  resetEmail1,
  textMessage,
  handleChange
}) => (
  <div onClick={closeModal} className="modal">
    <div className="modal-content clearfix">
      <div onClick={closeModal} className="close">
        &times;
      </div>
      <h4>Password Recovery</h4>
      <p>Provide your registered email to reset your password</p>
      <div className="email-container">
        <form>
          &nbsp;
          <i className="fa fa-user" />
          &nbsp;{' '}
          <input
            type="email"
            id="modal-email"
            placeholder="Email"
            name="resetEmail"
            value={resetEmail1}
            onChange={handleChange}
            autoFocus
          />
          <button onClick={sendEmail} id="modal-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      {textMessage.message && (
        <p
          id="modal-messageText"
          style={{ color: textMessage.color, fontSize: 12 }}
          className="text-center"
        >
          {textMessage.message}
        </p>
      )}
    </div>
  </div>
);
