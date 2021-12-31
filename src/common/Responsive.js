import React from "react";
import styled from "styled-components";

const ResponsiveBlock = styled.div`
  padding-left: 1.6rem;
  padding-right: 1.6rem;
`;

const Responsive = ({ children, ...rest }) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
