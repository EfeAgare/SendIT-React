import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ field, value, type, onChange }) => {
  return (
    <div className="input-row">
      <input
        type={type}
        name={field}
        className="input-box"
        value={value}
        onChange={onChange}
        placeholder={field}
      />
    </div>
  );
};

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
TextFieldGroup.defaultProps = {
  type: 'text '
};
export default TextFieldGroup;
