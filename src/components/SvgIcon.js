import React from "react";
import PropTypes from "prop-types";

import { Box } from "@theme-ui/components";

const SvgIcon = ({ iconPath, ...sx }) => {
  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="100%"
      fill="currentcolor"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      x="0"
      y="0"
      {...sx}
    >
      <path d={iconPath} fill="currentcolor" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Box>
  );
};

SvgIcon.propTypes = {
  /** Theme UI sx pragma */
  sx: PropTypes.any,
  /** icon svg path */
  iconPath: PropTypes.string.isRequired,
};

export default SvgIcon;
