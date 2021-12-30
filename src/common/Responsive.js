import React from "react";
import styled from "styled-components";

const ResponsiveBlock = styled.div`
  padding-left: 3.2rem;
  padding-right: 3.2rem;
  width: 100%;
`;

const Responsive = ({ children, ...rest }) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
