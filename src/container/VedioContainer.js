import React, { useEffect } from "react";
import styled from "styled-components";

const VedioContainer = () => {
  let localstream;

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
    } else {
    }
  };

  const onClick = () => {
    let video = document.querySelector("video");
    video.pause();
    video.src = "";
    localstream.getTracks()[0].stop();
    // video.style.display = "none";
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <VedioBlock>
      <Video />
      <div>
        <button
          onClick={() => {
            init();
          }}
        >
          비디어 켜기버튼
        </button>
        <button
          onClick={() => {
            onClick();
          }}
        >
          비디어 끄기버튼
        </button>
      </div>
    </VedioBlock>
  );
};

export default VedioContainer;

const VedioBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 0;
`;

const Video = styled.video`
  width: 500px;
  height: 400px;
`;
