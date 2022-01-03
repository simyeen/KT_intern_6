import React, { useState } from "react";
import styled from "styled-components";
import Form from "../common/Form";
import EventListener from "../container/EventListener";
import KakaoMapContainer from "../container/KakaoMapContainer";
import SliderContainer from "../container/SliderContainer";
import VedioContainer from "../container/VedioContainer";
import getLocation from "../util/getPosition";

const HomePage = () => {
  const [isEventOn, setIsEventOn] = useState(false);

  return (
    <Wrapper id="나는 래퍼">
      <Container>
        <VedioContainer />
        <KakaoMapContainer {...{ isEventOn }} />
        {!isEventOn && <EventListener {...{ setIsEventOn }} />}
      </Container>
      <button onClick={getLocation}>버튼</button>
      {/* <SliderContainer /> */}
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  diplay: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const Container = styled(Form)`
  diplay: flex;
  flex-direction: row;
  justify-content: space-between;
  /* width: 100%; */
  height: 100%;
`;
