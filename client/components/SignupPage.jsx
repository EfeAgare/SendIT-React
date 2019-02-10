import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import Header from './Header';
import Footer from './Footer';
import userSignup from '../action/userSignupAction';

class SignupPage extends Component {
  render() {
    const { userSignup } = this.props;
    return (
      <React.Fragment>
        <Header />
        <SignupForm userSignup={userSignup} />
        <Footer />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

SignupPage.propTypes = {
  userSignup: PropTypes.func.isRequired
};

export default connect(
  null,
  { userSignup }
)(SignupPage);
