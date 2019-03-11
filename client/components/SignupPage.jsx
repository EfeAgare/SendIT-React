import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import Header from './Header';
import Footer from './Footer';
import userSignup from '../action/userSignupAction';

export class SignupPage extends Component {
  render() {
    const { userSignup } = this.props;
    return (
      <React.Fragment>
        <Header />
        <SignupForm userSignup={userSignup} user={this.props.user} />
        <Footer />
      </React.Fragment>
    );
  }
}
export const mapStateToProps = state => {
  return {
    user: state.user,
    parcels: state.parcels
  };
};

SignupPage.propTypes = {
  userSignup: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { userSignup }
)(SignupPage);
