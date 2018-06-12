import React from "react";
import classnames from "classnames";

const button = props => (
  <button
    className={classnames("button_btn", props.btnType)}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
