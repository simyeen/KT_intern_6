// 필요할 때마다 Padding Component를 사용하면 적절한 여백을 넣을 수 있습니다.

import React from "react";
import styled, { css } from "styled-components";

const PaddingBlock = styled.div`
  width: 100%;
  height: 1.6rem;

  ${({ height }) =>
    height &&
    css`
      height: ${height}rem;
    `}
`;

const Padding = (props) => {
  return <PaddingBlock {...props} />;
};

export default Padding;
