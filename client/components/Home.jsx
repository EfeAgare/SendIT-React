import React from 'react';
import { Link } from 'react-router-dom';
import '../../UI/css/style.css';

const Home = props => {
  return (
    <div>
      <div className="header-clear">
        <header>
          <Link to="/" className="logo">
            {' '}
            SendIT
          </Link>
          <div className="header-right">
            <div id="myLinks" className="myLinks">
              <Link to="/" className="active">
                {' '}
                HOME
              </Link>
              <Link to="/signin"> LOGIN</Link>
              <Link to="/signup"> SIGN UP</Link>
              <Link to="/order"> ORDER PARCEL</Link>
            </div>
            <a className="icon">
              <i className="fa fa-bars" />
            </a>
          </div>
        </header>
      </div>
      <div className="hero-section">
        <div className="hero-section-text">
          <h1>SEND IT ANYWHERE</h1>
          <p>
            Our world-className service allows you to select the best courier
            for your needs and book them in a flash
          </p>
        </div>
      </div>
      <section>
        <div className="section-two">
          <h1>
            {' '}
            <span className="line"> ~ </span>How its Works{' '}
            <span className="line"> ~ </span>
          </h1>

          <div className="direction">
            <div className="section-two-p1">
              <p> Place a Parcel Delivery Order of your Choice</p>
              <br />
            </div>
            <div className="section-two-p2">
              <p>
                Confirm your Booking and choice of Delivery | Collection
                Services | Drop-off Services
              </p>
            </div>

            <div className="section-two-p3 ">
              <p>
                Our System Makes Your Booking and Choice of Your Delivery
                Convenient For You
              </p>
            </div>
            <div className="section-two-p4">
              <p> Track Your Parcel and Keep You Informed</p>
            </div>
          </div>
        </div>
      </section>

      <div id="get-started">
        <a href="">GET STARTED</a>
      </div>

      <div className="order-footer">
        <div>
          <a id="documentation" href="api-docs">
            Documentation
          </a>
        </div>
        <p className="foot">&copy;SendIT.com</p>
      </div>
    </div>
  );
};

export default Home;
