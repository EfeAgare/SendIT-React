import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../UI/css/style.css';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.context.router.history.push('/');
    }
  }
  render() {
    const { isAuthenticated } = this.props.isAuthenticated;
    const userLinks = (
      <div className="header-right">
        <div id="myLinks">
          <Link to="/" className="active">
            HOME
          </Link>
          <Link to="/order">ORDER PARCEL</Link>
          <Link
            to=""
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('userid');
              window.location.reload(true);
              this.context.router.history.push('/');
            }}
          >
            {' '}
            LOGOUT
          </Link>
          <Link to="/profile"> PROFILE </Link>
        </div>
        <a href="javascript:void(0);" className="icon">
          <i className="fa fa-bars" />
        </a>
      </div>
    );
    const guessLinks = (
      <div className="header-right">
        <div id="myLinks">
          <Link to="/" className="active">
            HOME
          </Link>
          <Link to="/signup">SIGN UP</Link>
          <Link to="/signin"> LOGIN</Link>
          <Link to="/order">ORDER PARCEL</Link>
        </div>
        <a href="javascript:void(0);" className="icon">
          <i className="fa fa-bars" />
        </a>
      </div>
    );

    return (
      <header>
        <Link to="/" className="logo">
          {' '}
          SendIT
        </Link>
        {isAuthenticated ? userLinks : guessLinks}
      </header>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user
  };
};
export default connect(mapStateToProps)(Header);
