import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SigninForm from './SigninForm';
import Header from './Header';
import Footer from './Footer';
import emailAction from '../action/emailAction';
import userSignin from '../action/userSigninAction';

class SigninPage extends Component {
  render() {
    const { userSignin, emailAction } = this.props;
    return (
      <React.Fragment>
        <Header />
        <SigninForm emailAction={emailAction} userSignin={userSignin} />
        <Footer />
      </React.Fragment>
    );
  }
}

SigninPage.propTypes = {
  emailAction: PropTypes.func.isRequired,
  userSignin: PropTypes.func.isRequired
};

export default connect(
  null,
  { userSignin, emailAction }
)(SigninPage);
