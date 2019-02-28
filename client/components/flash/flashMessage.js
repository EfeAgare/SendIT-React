import React, { Component } from 'react';
import '../../../UI/css/flashmessage.css';

class FlashMessage extends Component {
  render() {
    const { text } = this.props.message;
    return <div className="alert-success">{text} I love Jesus</div>;
  }
}

export default FlashMessage;
