// fileName : Responsive.js
// fileFunction : 필요에 따라 미디워 쿼리를 적용하기 위해 Responsive Component를 생성했습니다.

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
