import Proptypes from "prop-types";

const childrenPropTypes = Proptypes.oneOfType([
  Proptypes.arrayOf(Proptypes.node),
  Proptypes.node,
]);

export default childrenPropTypes;
