import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import SignupPage from './components/SignupPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignupPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
