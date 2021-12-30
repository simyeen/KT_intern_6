import React from "react";
import styled from "styled-components";
import KakaoMapContainer from "../container/KakaoMapContainer";
import VedioContainer from "../container/VedioContainer";

const HomePage = () => {
  return (
    <Container>
      <VedioContainer />
      <KakaoMapContainer />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  diplay: flex;
`;
