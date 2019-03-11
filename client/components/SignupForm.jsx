import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import '../../UI/css/sign.css';
import TextFieldGroup from './common/TextFieldGroup';


export class SignupForm extends Component {
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
        ? this.setState({ errors: res.errors || res.message })
        : this.props.history.push('/profile');
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
            <TextFieldGroup
              type="text"
              onChange={this.handleChange}
              value={this.state.username}
              field="username"
            />

            <label htmlFor="lastname" />
            <TextFieldGroup
              type="text"
              onChange={this.handleChange}
              value={this.state.lastname}
              field="lastname"
            />
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
            <label htmlFor="passwordConfirmation" />
            <TextFieldGroup
              type="password"
              onChange={this.handleChange}
              value={this.state.passwordConfirmation}
              field="passwordConfirmation"
            />
           
            <a id="submit-btn" className="submit-btn" onClick={this.onSubmit}>
              Create Your Account
            </a>
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
