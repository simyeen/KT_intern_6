import React from "react";
import styled, { css } from "styled-components";
import color from "../../lib/styles/color";

const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 60px;
  font-size: 1.2rem;
  outline: none;
  border: none;
  border-radius: 8px;
  color: ${color.black};

  background: ${color.orange};
  font-weight: 500;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: -0.4px;
  text-align: center;
  margin-right: 15px;
  cursor: pointer;
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
