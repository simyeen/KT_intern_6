import React, { useEffect, useState } from "react";
import styled from "styled-components";
import color from "../common/color";
import Form from "../common/Form";
import Text from "../common/Text";
import EventListener from "../container/EventListener";
import KakaoMapContainer from "../container/KakaoMapContainer";
import VedioContainer from "../container/VedioContainer";

const HomePage = () => {
  const [isEventOn, setIsEventOn] = useState(0);
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function ({ coords }) {
          setLocation(coords);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Wrapper>
      <Container>
        <VedioContainer />
        {!location && (
          <LoadingContainer>
            <Img src={require("../asset/KT_loading.png")} />
            <Text>위치정보를 얻고있습니다. 잠시만 기다려주세요!</Text>
          </LoadingContainer>
        )}
        {location && <KakaoMapContainer {...{ isEventOn }} {...{ location }} />}
        {!isEventOn && (
          <EventListener {...{ setIsEventOn }} {...{ isEventOn }} />
        )}
      </Container>
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 600px;
  height: 428px;
  border-radius: 15px;
  /* background-color: ${color.white}; */
`;
