import React from "react";

import ButtonUI from "@material-ui/core/Button";
import PropTypes from "prop-types";

const Button = ({ onClick = () => {}, color, children = null }) => {
  return (
    <ButtonUI variant="outlined" color={color} onClick={onClick}>
      {children}
    </ButtonUI>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Button.defaultProps = {
  color: "primary",
};

export default Button;
