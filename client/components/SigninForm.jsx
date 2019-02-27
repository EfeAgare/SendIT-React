import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../UI/css/sign.css';
import TextFieldGroup from './common/TextFieldGroup';
import { EmailModalForgottenPassword } from './EmailModalForgottenPassword';

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      modalIsOpen: false,
      resetEmail: '',
      modalState: {
        text: { message: '', color: '' }
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignin(this.state).then(res => {
      res.message !== 'Login successful'
        ? this.setState({ error: res.errors || res.message })
        : this.props.history.push('/profile');
    });
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal(event) {
    event.preventDefault();
    if (
      event.target.className === 'modal' ||
      event.target.className === 'close'
    )
      this.setState({ modalIsOpen: false });
  }
  sendEmail() {
    const { resetEmail, modalState } = this.state;
    this.setState({
      modalState: {
        ...modalState,
        text: { message: 'Processing...', color: 'lightblue' }
      }
    });
    this.props.emailAction(resetEmail).then(res => {
      if (res.message === 'Email sent successfully') {
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
  render() {
    const { error } = this.state;
    return (
      <div className="sign-img">
        <div className="signin-text">
          <h1>Giving Customer Confidence</h1>
          <p>The Best value for Your parcel</p>
          <p>
            Enjoy the unbeatable prices for your orders on almost all products
          </p>
          <p>Enjoy your order</p>
        </div>
        <div className="input-section">
          <p className="text-center">Login</p>
          <hr />
          <form className="form-box" onSubmit={this.onSubmit}>
            <p id="messageText">{error}</p>
            <label htmlFor="email" />
            <TextFieldGroup
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
              field="email"
            />
            <label htmlFor="password" />
            <TextFieldGroup
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
              field="password"
            />
            <a className="submit-btn" id="submit-btn" onClick={this.onSubmit}>
              Login
            </a>

            <Link to="#" onClick={this.openModal} id="forgot-pswd">
              {' '}
              Forgot your password ?
            </Link>
            <p id="account">
              {' '}
              Don't have an account yet <Link to="/signup"> Sign Up</Link>
            </p>
          </form>
          {this.state.modalIsOpen && (
            <EmailModalForgottenPassword
              closeModal={this.closeModal}
              sendEmail={this.sendEmail}
              handleChange={this.handleChange}
              textMessage={this.state.modalState.text}
              resetEmail={this.state.resetEmail}
            />
          )}
        </div>
      </div>
    );
  }
}
SigninForm.propTypes = {
  emailAction: PropTypes.func.isRequired,
  userSignin: PropTypes.func.isRequired
};

export default withRouter(SigninForm);
