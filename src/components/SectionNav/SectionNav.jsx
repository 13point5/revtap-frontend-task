import React from "react";
import clsx from "classnames";
import PropTypes from "prop-types";
import classes from "./styles.module.css";
import childrenPropTypes from "../../propTypes/children";

function SectionNav({ children, ...restProps }) {
  return (
    <div className={classes.container} {...restProps}>
      {children}
    </div>
  );
}

SectionNav.Item = ({ active, children, ...restProps }) => {
  return (
    <span
      className={clsx(classes.item, active && classes.itemActive)}
      {...restProps}
    >
      {children}
    </span>
  );
};

SectionNav.Item.defaultProps = {
  active: false,
};

SectionNav.Item.propTypes = {
  active: PropTypes.bool,
  children: childrenPropTypes.isRequired,
};

SectionNav.propTypes = {
  children: childrenPropTypes.isRequired,
};

export default SectionNav;
