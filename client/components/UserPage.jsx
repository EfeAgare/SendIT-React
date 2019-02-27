import React, { Component } from 'react';
import UserDisplayPage from './UserDisplayPage';
import ProfileFooter from './ProfileFooter';
import { loadParcel } from '../action/loadParcelAction';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    this.props.loadParcel();
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }
  render() {
    const { parcels, user } = this.props;
    return (
      <React.Fragment>
        <UserDisplayPage
          parcels={parcels}
          user={user}
          isLoading={this.state.isLoading}
        />
        <ProfileFooter />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    parcels: state.parcels
  };
};
UserPage.propTypes = {
  loadParcel: PropTypes.func.isRequired,
  parcels: PropTypes.array.isRequired
};
export default connect(
  mapStateToProps,
  { loadParcel }
)(UserPage);
