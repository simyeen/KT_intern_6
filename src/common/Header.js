// Header Component로 헤더의 html, css를 보여줍니다.

import React, { useState } from "react";
import styled, { css } from "styled-components";
import Padding from "./Padding";
import Text from "./Text";
import Responsive from "./Responsive";
import color from "./color";

const HeaderBlock = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  background: ${color.gray[50]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 5rem;
  display: flex;
  justify-content: space-between;
`;

const Cotainer = styled.div`
  display: flex;
  align-items: center;
`;

const Category = styled.div`
  margin-right: 20px;
  opacity: 0.3;

  cursor: pointer;

  &:hover {
    opacity: 1;
    font-weight: 1000;
  }

  ${(props) =>
    props.active &&
    css`
      color: ${color.KT_blue};
      border-bottom: 2px solid ${color.KT_blue};
      font-weight: 1000;
      opacity: 1;
    `}
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 75px;
  height: 75px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const Header = ({ categories, setPostList }) => {
  const [selectCategory, setSelectCategory] = useState("홈");
  const onSelect = (category) => {
    setSelectCategory(category);
  };

  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <TitleDiv>
            <Img src={process.env.PUBLIC_URL + "/favicon.ico"} />
            <Text fontSize={30} fontWeight={1000}>
              WAKE UP GENIE
            </Text>
          </TitleDiv>
          <div />
          <Cotainer>
            {categories.map((c, index) => (
              <Category
                key={c.content}
                onClick={() => {
                  setPostList(index);
                  onSelect(c.content);
                }}
                active={selectCategory === c.content}
              >
                <Text hover fontSize={24}>
                  {c.content}
                </Text>
              </Category>
            ))}
          </Cotainer>
        </Wrapper>
      </HeaderBlock>
      <Padding height={5} />
    </>
  );
};

export default Header;
