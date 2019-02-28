import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FlashMessage from './flashMessage';
import '../../../UI/css/flashmessage.css';

class FlashMessageList extends Component {
  render() {
    const messages = this.props.messages;
    return (
      <div className="alert-success">
        {messages.map(message => {
          <FlashMessage key={message.id} message={message} />;
        })}
      </div>
    );
  }
}

FlashMessageList.propType = {
  messages: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  messages: state.flashMessages
});

export default connect(mapStateToProps)(FlashMessageList);
