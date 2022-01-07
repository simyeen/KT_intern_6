// fileName : HomePage.js
// fileFunction : HomePage Component로 필요한 Container들을 import 해서 보여줍니다.

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Form from "../common/Form";
import Text from "../common/Text";
import MapContainer from "../container/MapContainer";
import VedioContainer from "../container/VedioContainer";

const HomePage = () => {
  const [location, setLocation] = useState(null);

  // 1. html geolocation를 이용해 현재 위, 경도를 얻어냅니다.
  const getLocation = () => {
    if (navigator.geolocation) {
      // 2. GPS를 지원하면 location을 업데이트 합니다.
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
        {location && <MapContainer {...{ location }} />}
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
`;
