import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import speakDestination from "../util/speakDestination";
import KaKaoMapPresenter from "../presenter/KaKaoMapPresenter";
import PlaceSearch from "../util/PlacesSearch";
import { KT_CENTER } from "../common/const";
import { Button } from "@mui/material";

const KakaoMapContainer = () => {
  const { kakao } = window;
  let map;

  const init = () => {
    const $mapContainer = document.getElementById("map");

    let mapOption = {
      center: new kakao.maps.LatLng(KT_CENTER.Y, KT_CENTER.X),
      level: 3,
    };
    map = new kakao.maps.Map($mapContainer, mapOption);
    let markerPosition = new kakao.maps.LatLng(KT_CENTER.Y, KT_CENTER.X);

    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  };

  const onEvent = (map) => {
    console.log("실행");
    const ps = new PlaceSearch(map);
    ps.keywordSearch();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <KakaoMapContainerBlock>
        <div id="map" style={{ width: "600px", height: "400px" }} />
        {/* {dataList.map((data, index) => (
          <KaKaoMapPresenter {...{ data }} key={index} />
        ))} */}
        {/* <KaKaoMapPresenter /> */}
        <Button
          onClick={() => {
            speakDestination({ text: "알아서 찾으세욥." });
          }}
        >
          다시 듣기
        </Button>
        <Button
          onClick={() => {
            onEvent(map);
            speakDestination({ replay: true, text: "모르겠습니다." });
          }}
        >
          재탐색
        </Button>
      </KakaoMapContainerBlock>
    </>
  );
};

export default KakaoMapContainer;

const KakaoMapContainerBlock = styled.div`
  /* display: flex; */
`;
