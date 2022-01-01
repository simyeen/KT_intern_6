import React, { useState } from "react";
import styled from "styled-components";
import Form from "../common/Form";
import EventListener from "../container/EventListener";
import KakaoMapContainer from "../container/KakaoMapContainer";
import SliderContainer from "../container/SliderContainer";
import VedioContainer from "../container/VedioContainer";

const HomePage = () => {
  const [isEventOn, setIsEventOn] = useState(false);

  return (
    <Wrapper>
      <Container>
        <VedioContainer />
        <KakaoMapContainer {...{ isEventOn }} />
      </Container>
      {!isEventOn && <EventListener {...{ setIsEventOn }} />}
      {/* <SliderContainer /> */}
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
