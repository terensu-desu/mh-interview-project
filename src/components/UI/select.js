import React from "react";
import classnames from "classnames";

const select = ({
  name,
  value,
  options,
  valid,
  error,
  touched,
  onChange,
  classType
}) => {
  const mappedOptions = options.map(option => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
  return (
    <div className="inputWrapper_wrapper">
      <select
        className={classnames("inputWrapper_selectField textbox", classType, {
          "inputWrapper_selectField-invalid": !valid && touched
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {mappedOptions}
      </select>
      {!valid &&
        touched && <div className="inputWrapper_errorMessage">{error}</div>}
    </div>
  );
};

export default select;
