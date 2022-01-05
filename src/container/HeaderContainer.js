// 상단 오른쪽의 Home menu를 보여주는 Component입니다.

import React from "react";
import styled from "styled-components";
import Header from "../common/Header";

const HeaderContainerBlock = styled.div``;

const HeaderContainer = ({ setPostList }) => {
  const categories = [
    { content: "홈" },
    // { content: "서비스 소개" },
    // { content: "팀 소개" },
  ];

  return (
    <HeaderContainerBlock>
      <Header {...{ categories }} {...{ setPostList }} />
    </HeaderContainerBlock>
  );
};

export default HeaderContainer;
