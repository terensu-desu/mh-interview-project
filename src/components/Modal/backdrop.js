import React from "react";
const backdrop = props =>
  props.show ? (
    <div className="modalWrapper_backdrop" onClick={props.clicked} />
  ) : null;

export default backdrop;
