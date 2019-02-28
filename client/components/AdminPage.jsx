import React, { Component } from 'react';
import AdminDisplayPage from './AdminDisplayPage';
import ProfileFooter from './ProfileFooter';
import { loadAllParcel } from '../action/loadParcelAction';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    this.props.loadAllParcel();
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
    this.setState({ isLoading: false });
  }
  render() {
    const { parcels, user } = this.props;
    return (
      <React.Fragment>
        <AdminDisplayPage
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
AdminPage.propTypes = {
  loadAllParcel: PropTypes.func.isRequired,
  parcels: PropTypes.array.isRequired
};
export default connect(
  mapStateToProps,
  { loadAllParcel }
)(AdminPage);
