import React from "react";
import styled from "styled-components";
import Form from "../common/Form";
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

const Container = styled(Form)`
  diplay: flex;
  flex-direction: row;
  justify-content: space-between;
`;
