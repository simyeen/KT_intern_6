import React from "react";
import styled from "styled-components";
import Form from "../common/Form";
import KakaoMapContainer from "../container/KakaoMapContainer";
import VedioContainer from "../container/VedioContainer";
import axios from "axios";

const HomePage = () => {
  const onClick = async () => {
    const xmlData = "<speak>가장 가까운 곳은.</speak>";
    try {
      const { data } = await axios.post(
        "https://kakaoi-newtone-openapi.kakao.com/v1/synthesize",
        xmlData,
        {
          headers: {
            "Content-Type": "application/xml",
            Authorization: `KakaoAK db3bb37a8a4e03a522400cc0a94ba0b7`,
          },
          responseType: "arraybuffer",
        }
      );

      console.log(data);
      const context = new AudioContext();
      context.decodeAudioData(data, (buffer) => {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Container>
      <button onClick={onClick}>버튼</button>

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
