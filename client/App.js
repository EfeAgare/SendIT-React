import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import UserPage from './components/UserPage';
import CreateParcel from './components/CreateParcel';
import { SET_CURRENT_USER } from './constants/action-types';
import store from './store/configureStore';
import requireAuth from './utils/Authenticate';
import ParcelDetailPage from './components/ParcelDetailPage';
import AdminPage from './components/AdminPage';
import { ToastContainer } from 'react-toastify';
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css"

if (localStorage.getItem('token')) {
  // Set auth token header auth
  const token = localStorage.getItem('token');
  // Decode token and get user info and exp
  const user = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch({
    type: SET_CURRENT_USER,
    user
  });
}
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ToastContainer autoClose={7000} hideProgressBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/logout" component={Home} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/signin" component={SigninPage} />
          <Route exact path="/profile" component={requireAuth(UserPage)} />
          <Route exact path="/admin" component={requireAuth(AdminPage)} />
          <Route exact path="/order" component={requireAuth(CreateParcel)} />
          <Route
            exact
            path="/viewdetails/:parcelId"
            component={requireAuth(ParcelDetailPage)}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
