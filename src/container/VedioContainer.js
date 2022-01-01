import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import color from "../common/color";

const VedioContainer = () => {
  let localstream;

  const [isVideoOn, setIsVideoOn] = useState(false);

  const init = () => {
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

  const onClick = () => {
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
              fontSize: "2.2rem",
              fontWeight: "700",
              backgroundColor: `${color.darkGray}`,
              marginRight: "50px",
              borderRadius: "8px",
            }}
            variant="contained"
            onClick={() => {
              init();
            }}
          >
            켜키
          </Button>
          <Button
            sx={{
              fontSize: "2.2rem",
              fontWeight: "700",
              backgroundColor: `${color.darkGray}`,
              borderRadius: "8px",
            }}
            variant="contained"
            onClick={() => {
              onClick();
            }}
          >
            끄기
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
  justify-content: space-between;
  padding: 16px 16px;
`;
