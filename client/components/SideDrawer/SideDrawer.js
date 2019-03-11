import React, { Component } from 'react';
import '../../../UI/css/style.css';
import '../../../UI/css/SideDrawer.css';
import { NavLink } from 'react-router-dom';
import { utils } from '../../utils/userUtils';

class SideDrawer extends Component {
  render() {
    const { show, user, isAuthenticated } = this.props;
    const guestDropDown = (
      <React.Fragment>
        <li>
          <NavLink to="/signup" activeClassName="active">
            SIGN UP
          </NavLink>
        </li>
        <li>
          <NavLink to="/signin" activeClassName="active">
            {' '}
            LOGIN
          </NavLink>
        </li>
        <li>
          <NavLink to="/order" activeClassName="active">
            ORDER PARCEL
          </NavLink>
        </li>
      </React.Fragment>
    );
    const userDropDown = (
      <React.Fragment>
        <NavLink
          to="#"
          onClick={() => {
            utils;
                    window.location.reload(true);
                    this.context.router.history.push('/');
          }}
        >
          LOGOUT
        </NavLink>
        {user.detail.role === 'admin' ? (
          <li>
            <NavLink to="/admin" activeClassName="active">
              {' '}
              ALLPARCELS{' '}
            </NavLink>
          </li>
        ) : (
          <React.Fragment>
            <li>
              <NavLink to="/profile" activeClassName="active">
                {' '}
                PROFILE{' '}
              </NavLink>{' '}
            </li>
            <li>
              <NavLink to="/order" activeClassName="active">
                ORDER PARCEL
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </React.Fragment>
    );
    let drawerClasses = 'side-drawer';
    if (show) {
      drawerClasses = 'side-drawer open';
    }
    return (
      <nav className={drawerClasses}>
      <div className="header-right">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              HOME
            </NavLink>
          </li>
          {isAuthenticated.isAuthenticated ? userDropDown : guestDropDown}
        </ul>
        </div>
      </nav>
    );
  }
}

export default SideDrawer;

