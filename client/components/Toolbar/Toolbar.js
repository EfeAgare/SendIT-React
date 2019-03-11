import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import '../../../UI/css/Toolbar.css';
import { Link, NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { utils } from '../../utils/userUtils';

class ToolBar extends Component {
  render() {
    const { drawerClickHandler, user, isAuthenticated } = this.props;
    const userToolBar = (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__logo">
            <Link to="/" className="logo">
              {' '}
              SendIT
            </Link>
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            <ul>
              <li>
                <NavLink to="/" exact activeClassName="active">
                  HOME
                </NavLink>
              </li>
              <li>
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
              </li>

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
            </ul>
          </div>
          <div className="toolbar__toggle-button">
            <DrawerToggleButton click={drawerClickHandler} />
          </div>
        </nav>
      </header>
    );
    const guestToolbar = (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__logo">
            <Link to="/" className="logo">
              {' '}
              SendIT
            </Link>
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            <ul>
              <li>
                <NavLink to="/" exact activeClassName="active">
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" activeClassName="active">
                  SIGN UP
                </NavLink>
              </li>
              <NavLink to="/signin" activeClassName="active">
                {' '}
                LOGIN
              </NavLink>
              <li>
                <NavLink to="/order" activeClassName="active">
                  ORDER PARCEL
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="toolbar__toggle-button">
            <DrawerToggleButton click={drawerClickHandler} />
          </div>
        </nav>
      </header>
    );
    return (
      <div>{isAuthenticated.isAuthenticated ? userToolBar : guestToolbar}</div>
    );
  }
}
ToolBar.contextTypes = {
  router: PropTypes.object.isRequired
};
export default ToolBar;
