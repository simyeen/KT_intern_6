import React from "react";
import styled from "styled-components";
import color from "../../lib/styles/color";

const LineBlock = styled.div`
  width: 100%;
  height: 1px;
  background: ${color.gray[100]};
`;

const Line = (props) => {
  return <LineBlock {...props} />;
};

export default Line;
