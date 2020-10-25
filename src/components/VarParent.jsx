/* eslint-disable */
import React from "react";

function VarParent({ parent: Parent, children, ...restProps }) {
  return <Parent {...restProps}>{children}</Parent>;
}

export default VarParent;
