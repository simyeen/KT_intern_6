import React from "react";
import styled from "styled-components";
import Padding from "./Padding";
import Text from "./Text";
import Responsive from "./Responsive";
import { NavLink } from "react-router-dom";
import color from "./color";

const HeaderBlock = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 8rem;
  display: flex;
  flex-direction: column;
`;

const Cotainer = styled.div`
  display: flex;
`;

const Category = styled.div`
  display: inline;
  margin-right: 20px;
  padding-bottom: 0.3rem;
  font-size: 1.5rem;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    font-weight: 700;
  }
  &.active {
    color: ${color.orange};
    border-bottom: 2px solid ${color.orange};
  }
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const Header = ({ categories, setPostList }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <TitleDiv>
            <Text fontSize={32} fontWeight={1000}>
              Wake up 지니
            </Text>
            <Img src={process.env.PUBLIC_URL + "/favicon.ico"} />
          </TitleDiv>

          <Cotainer>
            {categories.map((c, index) => (
              <Category
                exact={c.content === "홈"}
                key={c.content}
                onClick={() => {
                  setPostList(index);
                }}
              >
                {c.content}
              </Category>
            ))}
          </Cotainer>
        </Wrapper>
      </HeaderBlock>
      <Padding height={8} />
    </>
  );
};

export default Header;
