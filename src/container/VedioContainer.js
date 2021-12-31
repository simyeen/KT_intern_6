import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import color from "../common/color";
import i from "../asset/KT_character.png";

const VedioContainer = () => {
  let localstream;

  const [isVideoOn, setIsVideoOn] = useState(true);

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
    video.pause();
    video.src = "";
    // localstream.getTracks()[0].stop();
    setIsVideoOn(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <VedioBlock>
      {isVideoOn && <Video />}
      {!isVideoOn && <Img src={require("../asset/KT_character.png")} />}
      <VideoCotainer>
        <Button
          sx={{
            fontSize: "2.2rem",
            fontWeight: "700",
            backgroundColor: `${color.darkGray}`,
            marginRight: "50px",
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
          }}
          variant="contained"
          onClick={() => {
            onClick();
          }}
        >
          끄기
        </Button>
      </VideoCotainer>
    </VedioBlock>
  );
};

export default VedioContainer;

const VedioBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const Video = styled.video`
  width: 500px;
  height: 400px;
  margin-right: 100px;
`;

const Img = styled.img`
  width: 500px;
  height: 400px;
  margin-right: 100px;
`;

const VideoCotainer = styled.div`
  display: flex;
  flex-direction: row;
`;
