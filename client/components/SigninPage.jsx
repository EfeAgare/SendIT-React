import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SigninForm from './SigninForm';
import Header from './Header';
import LoginFooter from './LoginFooter';
import emailAction from '../action/emailAction';
import userSignin from '../action/userSigninAction';

export class SigninPage extends Component {
  render() {
    const { userSignin, emailAction } = this.props;
    return (
      <React.Fragment>
        <Header />
        <SigninForm emailAction={emailAction} userSignin={userSignin} />
    
        <LoginFooter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.detail,
    parcels: state.parcels
  };
};
SigninPage.propTypes = {
  emailAction: PropTypes.func.isRequired,
  userSignin: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { userSignin, emailAction }
)(SigninPage);
