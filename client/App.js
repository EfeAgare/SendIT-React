import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/signin" component={SigninPage} />
        
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
