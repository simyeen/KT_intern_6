// 웹 페이지 좌측에 있는 비디오를 보여주는 Vedio Component입니다.
// 사용자는 이 화면을 통해 자신의 모습을 확인할 수 있습니다.

import React, { useState } from "react";
import styled from "styled-components";
import color from "../common/color";

import Button from "@mui/material/Button";

const VedioContainer = () => {
  const [isVideoOn, setIsVideoOn] = useState(false);
  let localstream;

  // 1. HTML의  navigator.getUserMedia의 권한을 얻습니다. => 카메라 권한 요청.
  const onStartVedio = () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { audio: false, video: true },

        function (stream) {
          let video = document.querySelector("video");
          video.srcObject = stream;
          localstream = stream;
          video.onloadedmetadata = function (e) {
            video.play();
          };
        },

        function (err) {}
      );
      setIsVideoOn(true);
    } else {
      console.log("비디오 열기 실패");
    }
  };

  // 2. pause로 비디오 끄는 함수입니다.
  const onStopVedio = () => {
    let video = document.querySelector("video");

    if (!isVideoOn) {
      return;
    }

    video.pause();
    video.src = "";
    setIsVideoOn(false);
  };

  return (
    <VedioBlock>
      {isVideoOn && (
        <VideoWrapper>
          <Video />
        </VideoWrapper>
      )}
      {!isVideoOn && <Img src={require("../asset/KT_character.png")} />}
      <VideoCotainer>
        <ButtonDiv>
          <Button
            sx={{
              fontSize: "2rem",
              fontWeight: "700",
              backgroundColor: `${color.darkGray}`,
              marginRight: "50px",
              borderRadius: "8px",
            }}
            variant="contained"
            onClick={() => {
              onStartVedio();
            }}
          >
            비디오 켜기
          </Button>
          <Button
            sx={{
              fontSize: "2rem",
              fontWeight: "700",
              backgroundColor: `${color.darkGray}`,
              borderRadius: "8px",
            }}
            variant="contained"
            onClick={() => {
              onStopVedio();
            }}
          >
            비디오 끄기
          </Button>
        </ButtonDiv>
      </VideoCotainer>
    </VedioBlock>
  );
};

export default VedioContainer;

const VedioBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoWrapper = styled.div`
  width: 600px;
  height: 428px;
  border-radius: 15px;
`;

const Video = styled.video`
  width: 600px;
  height: 428px;
  border-radius: 10px;
`;

const Img = styled.img`
  border-radius: 15px;
`;

const VideoCotainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 16px;
`;
