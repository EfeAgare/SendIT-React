import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../UI/css/sign.css';
import '../../UI/css/order.css';
import '../../UI/css/style.css';
import Header from './Header';
import TextFieldGroup from './common/TextFieldGroup';
import parcelOrder from '../action/createParcelAction';
class CreateParcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      deliveryAddress: '',
      deliveryPNumber: '',
      pickUpAddress: '',
      itemDescription: '',
      itemWeight: '',
      itemQuantity: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.parcelOrder(this.state).then(res => {
      res.message !== 'Parcels created successfully'
        ? this.setState({ error: res.errors || res.message })
        : this.props.history.push('/profile');
    });
  }
  render() {
    const { error } = this.state;
    return (
      <div>
        <Header />
        <div id="content-parcel">
          <aside>
            <div className="aside">
              <Link to="/profile"> Profile</Link>
              <Link to="/profile"> View Parcels</Link>
            </div>
          </aside>
          <main>
            <h3 className="order-title">Place an Order Of Your Choice</h3>
            <div className="form-container">
              <div className="container">
                <form onSubmit={this.onSubmit}>
                  <p id="messageText">{error}</p>
                  <ul className="flex-outer">
                    <li>
                      <label htmlFor="name">Name: </label>
                      <TextFieldGroup
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.name}
                        field="name"
                      />
                    </li>
                    <li>
                      <label htmlFor="delivery-address">
                        Delivery Address:{' '}
                      </label>
                      <TextFieldGroup
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.deliveryAddress}
                        field="deliveryAddress"
                      />
                    </li>
                    <li>
                      <label htmlFor="phone-number">Phone Number: </label>
                      <TextFieldGroup
                        type="number"
                        onChange={this.handleChange}
                        value={this.state.deliveryPNumber}
                        field="deliveryPNumber"
                      />
                    </li>
                    <li>
                      <label htmlFor="item-name">PickUp Address:</label>
                      <TextFieldGroup
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.pickUpAddress}
                        field="pickUpAddress"
                      />
                    </li>
                    <li>
                      <label htmlFor="item-name">Item Description:</label>
                      <TextFieldGroup
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.itemDescription}
                        field="itemDescription"
                      />
                    </li>
                    <li>
                      <label htmlFor="itemWeight">Item Weight (Kg):</label>
                      <TextFieldGroup
                        type="number"
                        min="1"
                        onChange={this.handleChange}
                        value={this.state.itemWeight}
                        field="itemWeight"
                      />
                    </li>
                    <li>
                      <label htmlFor="itemQuantity">Item Quantity:</label>
                      <TextFieldGroup
                        type="number"
                        min="1"
                        onChange={this.handleChange}
                        value={this.state.itemQuantity}
                        field="itemQuantity"
                      />
                    </li>
                    <li>
                      <button type="submit" id="submit-btn">
                        Submit
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </main>
        </div>
        <div className="footer-order">
          <p className="foot">&copy;SendIT.com</p>
        </div>
      </div>
    );
  }
}
CreateParcel.propTypes = {
  parcelOrder: PropTypes.func.isRequired
};

export default connect(
  null,
  { parcelOrder }
)(CreateParcel);
