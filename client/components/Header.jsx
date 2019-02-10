import React from 'react';
import { Link } from 'react-router-dom';
import '../../UI/css/style.css';

const Header = props => {
  return (
    <header>
      <Link to="/" className="logo"> SendIT</Link>
      <div className="header-right">
        <div id="myLinks">
          <Link to="/" className="active">HOME</Link>
          <Link to="/order">ORDER PARCEL</Link>
        </div>
        <a href="javascript:void(0);" className="icon">
          <i className="fa fa-bars" />
        </a>
      </div>
    </header>
  );
};

export default Header;
