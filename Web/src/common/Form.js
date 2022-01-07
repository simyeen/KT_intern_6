// fileName : Form.js
// fileFunction :
// 1. 기본적인 CSS Template으로 1.6rem의 padding 값을 가지고 있습니다.
// 2. 필요할 시 Form div를 export해서 사용합니다.

import React from "react";
import styled, { css } from "styled-components";
import color from "./color";

const StyledForm = styled.div`
  max-width: 100%;
  padding: 1.6rem 1.6rem;
  background: ${color.gray[50]};
  display: flex;
  flex-direction: column;

  ${({ background }) =>
    background &&
    css`
      background: ${background};
    `};

  @media only screen and (min-width: 414px) {
    padding: 0, 0;
  }
`;

const Form = ({ children, ...rest }) => {
  return <StyledForm {...rest}>{children}</StyledForm>;
};

export default Form;
