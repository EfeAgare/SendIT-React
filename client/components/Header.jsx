import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../UI/css/style.css';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FlashMessageList from './flash/flashMessagesList';

class Header extends Component {
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.context.router.history.push('/');
    }
  }
  render() {
    const { isAuthenticated, user } = this.props;
    const userLinks = (
      <div>
        <div className="header-right">
          <div id="myLinks">
            <NavLink to="/" exact activeClassName="active">
              HOME
            </NavLink>
            <NavLink to="/order" activeClassName="active">
              ORDER PARCEL
            </NavLink>
            <NavLink
              to="#"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userid');
                window.location.reload(true);
                this.context.router.history.push('/');
              }}
            >
              LOGOUT
            </NavLink>
            <NavLink to="/profile" activeClassName="active">
              {' '}
              PROFILE{' '}
            </NavLink>
          </div>
          <a href="javascript:void(0);" className="icon">
            <i className="fa fa-bars" />
          </a>
        </div>
      </div>
    );
    const guessLinks = (
      <div>
        <div className="header-right">
          <div id="myLinks">
            <NavLink to="/" exact activeClassName="active">
              HOME
            </NavLink>
            <NavLink to="/signup" activeClassName="active">
              SIGN UP
            </NavLink>
            <NavLink to="/signin" activeClassName="active">
              {' '}
              LOGIN
            </NavLink>
            <NavLink to="/order" activeClassName="active">
              ORDER PARCEL
            </NavLink>
          </div>
        
        <a href="javascript:void(0);" className="icon">
          <i className="fa fa-bars" />
        </a>
        </div>
        <FlashMessageList />
      </div>
    );

    return (
      <div>
        <header>
          <Link to="/" className="logo">
            {' '}
            SendIT
          </Link>
          {isAuthenticated.isAuthenticated ? userLinks : guessLinks}
        </header>
        <div />
        {/* <div>
         <p id="userWelcomeText">
          <i className="fa fa-user-circle" />
          &nbsp;Logged in as {user.detail.name}
        </p>
      </div> */}
      </div>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user,
    user: state.user
  };
};
export default connect(mapStateToProps)(Header);
