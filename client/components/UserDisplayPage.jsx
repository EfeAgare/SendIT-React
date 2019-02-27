import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../UI/css/profile.css';
import '../../UI/css/sign.css';
import '../../UI/css/style.css';
import '../../UI/css/order.css';
import '../../UI/css/allparcel.css';
import ParcelListRow from './ParcelListRow';
import Header from './Header';
class UserDisplayPage extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      parcelsPage: 10
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  render() {
    const { parcels, user, isLoading } = this.props;
    const { currentPage, parcelsPage } = this.state;

    // Logic for displaying current parcels
    const indexOfLastTodo = currentPage * parcelsPage;
    const indexOfFirstTodo = indexOfLastTodo - parcelsPage;
    const currentParcels = parcels.slice(indexOfFirstTodo, indexOfLastTodo);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(parcels.length / parcelsPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number, id) => {
      return (
        <div
          key={id}
          id={number}
          onClick={this.handleClick}
          className="pagination"
        >
          {number}
        </div>
      );
    });
    return (
      <div>
        <Header />
        <div id="content">
          <aside>
            <div className="aside">
              <div className="imagerow">
                <div className="small-12 medium-2 large-2 columns">
                  <div className="circle">
                    <img className="profile-pic man-image" src="" />
                  </div>
                  <div className="p-image">
                    <i className="fa fa-camera upload-button"> </i>
                    <input
                      className="file-upload"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              <p className="my" />
              <p className="myname" />
              {user.detail.name}
              <a href="profile.html" className="number-order">
                Number of Parcels Order
                <div id="number-order-parcel" className="number-order" />
                {parcels.length}
              </a>
            </div>
          </aside>
          <main>
            <div className="wrapper">
              <h1> Parcel Delivery Order</h1>
              <div className="container">
                {isLoading ? (
                  <div className="loader" />
                ) : (
                  <ParcelListRow
                    parcels={currentParcels}
                    isLoading={isLoading}
                    user={user}
                  />
                )}
                <p className="text-center" id="page-num" />
                {renderPageNumbers}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(UserDisplayPage);
