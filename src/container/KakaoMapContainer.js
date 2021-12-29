import React, { useEffect } from "react";
import styled from "styled-components";

const KakaoMapContainer = () => {
  let localstream;

  const kakaoMapInit = () => {
    var container = document.getElementById("map");
    var options = {
      center: new window.kakao.maps.LatLng(
        37.365264512305174,
        127.10676860117488
      ),
      level: 3,
    };

    let map = new window.kakao.maps.Map(container, options);
  };

  const vedioInit = () => {
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
    kakaoMapInit();
    vedioInit();
  }, []);

  return (
    <>
      <KakaoMapContainerBlock>
        <Video />
        <div id="map" style={{ width: "500px", height: "400px" }} />
      </KakaoMapContainerBlock>
      <div>
        <button
          onClick={() => {
            vedioInit();
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
    </>
  );
};

export default KakaoMapContainer;

const KakaoMapContainerBlock = styled.div`
  display: flex;
`;

const Video = styled.video`
  width: 500px;
  height: 400px;
`;
