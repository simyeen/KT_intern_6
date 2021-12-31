import React from "react";
import styled from "styled-components";
import Padding from "./Padding";
import Text from "./Text";
import Responsive from "./Responsive";
import color from "./color";

const HeaderBlock = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 6rem;
  display: flex;
  justify-content: space-between;
`;

const Cotainer = styled.div`
  display: flex;
  align-items: center;
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
          <div />
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
      <Padding height={6} />
    </>
  );
};

export default Header;
