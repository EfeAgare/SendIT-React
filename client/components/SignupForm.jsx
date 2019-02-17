import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import '../../UI/css/sign.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignup(this.state).then(res => {
      res.message !== 'user created successfully'
        ? this.setState({ errors: res.errors || res.message})
        : this.props.history.push('/');
    });
  }
  render() {
    return (
      <div className="header-clear">
        <div className="input-section signup">
          <p className="text-center">Sign Up</p>
          <hr />
          <p id="messageText">{this.state.errors}</p>
          <form className="form-box" onSubmit={this.onSubmit}>
            <p id="messageText" />
            <label htmlFor="username" />
            <div className="input-row">
              <input
                type="text"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
                className="input-box"
                placeholder="username"
              />
            </div>
            <label htmlFor="lastname" />
            <div className="input-row">
              <input
                type="text"
                name="lastname"
                onChange={this.handleChange}
                value={this.state.lastname}
                className="input-box"
                placeholder="lastname"
              />
            </div>
            <label htmlFor="email" />
            <div className="input-row">
              <input
                type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                className="input-box"
                placeholder="example@good.com"
              />
            </div>
            <label htmlFor="password" />
            <div className="input-row">
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                className="input-box"
                placeholder="Password"
              />
            </div>
            <label htmlFor="passwordConfirmation" />
            <div className="input-row">
              <input
                type="password"
                name="passwordConfirmation"
                className="input-box"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={this.state.passwordConfirmation}
              />
            </div>
            <button id="submit-btn" className="submit-btn">
              Create Your Account
            </button>
          </form>
        </div>
      </div>
    );
  }
}
SignupForm.propTypes = {
  userSignup: PropTypes.func.isRequired
};

export default withRouter(SignupForm);
