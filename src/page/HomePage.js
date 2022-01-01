import React from "react";
import styled from "styled-components";
import Form from "../common/Form";
import KakaoMapContainer from "../container/KakaoMapContainer";
import SliderContainer from "../container/SliderContainer";
import VedioContainer from "../container/VedioContainer";

const HomePage = () => {
  return (
    <Wrapper>
      <Container>
        <VedioContainer />
        <KakaoMapContainer />
      </Container>
      <SliderContainer />
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  diplay: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Container = styled(Form)`
  diplay: flex;
  flex-direction: row;
  justify-content: space-between;
`;
