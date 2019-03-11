import React, { Component } from 'react';
import '../../UI/css/style.css';
import { connect } from 'react-redux';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';

export class Header extends Component {
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) this.context.router.history.push('/');
  }
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    const { isAuthenticated, user } = this.props;
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        <Toolbar
          drawerClickHandler={this.drawerToggleClickHandler}
          user={user}
          isAuthenticated={isAuthenticated}
        />
        <SideDrawer
          show={this.state.sideDrawerOpen}
          isAuthenticated={isAuthenticated}
          user={user}
        />
        {backdrop}
      </div>
    );
  }
}



export const mapStateToProps = state => {
  return {
    isAuthenticated: state.user,
    user: state.user
  };
};
export default connect(mapStateToProps)(Header);
