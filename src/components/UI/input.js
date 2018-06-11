import React from "react";
import classnames from "classnames";

const input = ({
  name,
  placeholder,
  value,
  valid,
  error,
  touched,
  onChange,
  classType
}) => {
  return (
    <div className="inputWrapper_wrapper">
      <input
        className={classnames("inputWrapper_inputField textbox", classType, {
          "inputWrapper_inputField-invalid": !valid && touched
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {!valid &&
        touched && <div className="inputWrapper_errorMessage">{error}</div>}
    </div>
  );
};

export default input;
