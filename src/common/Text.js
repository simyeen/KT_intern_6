import React from "react";
import styled, { css } from "styled-components";

const StyledText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.03em;
  text-align: left;

  ${(props) =>
    props.fontWeight &&
    css`
      font-weight: ${props.fontWeight};
    `}

  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize}px;
    `}

    ${(props) =>
    props.textAlign &&
    css`
      text-align: ${props.textAlign};
    `}

  ${(props) =>
    props.marginLeft &&
    css`
      margin-left: ${props.marginLeft}rem;
    `};

  ${(props) =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop}rem;
    `};

  ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: ${props.marginBottom}rem;
    `};

  ${(props) =>
    props.hover &&
    css`
      &:hover {
        font-weight: 550;
        cursor: pointer;
      }
    `}
`;

const Text = ({ children, ...rest }) => {
  return <StyledText {...rest}>{children}</StyledText>;
};

export default Text;
