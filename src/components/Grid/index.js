import React from "react";

import PropTypes from "prop-types";

// Styles
import { Wrapper, Content } from "./Grid.styles";

const Grid = ({ header, children }) => (
  <Wrapper>
    <h1>{header}</h1>
    <Content>{children}</Content>
  </Wrapper>
);

Grid.propTypes = {
  header: PropTypes.string,
  // No need to check the children as its a built in prop (no need to verify)
};

export default Grid;
