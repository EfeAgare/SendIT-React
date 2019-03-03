import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addFlashmessage } from '../action/flashMessagesAction';
import { toast } from 'react-toastify';

export default function(ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        // this.props.addFlashmessage({
        //   type: 'error',
        //   text: 'You need to login/signUp to access this page'
        // });
        toast.error('You need to login/signUp to access this page');
        this.context.router.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/');
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashmessage: PropTypes.func.isRequired
  };
  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.user.isAuthenticated,
      messages: state.flashMessages
    };
  };
  return connect(
    mapStateToProps,
    { addFlashmessage }
  )(Authenticate);
}
