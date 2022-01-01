import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import haversine from "haversine-distance";
import speakDestination from "../util/speakDestination";
import KaKaoMapPresenter from "../presenter/KaKaoMapPresenter";
import { KT_CENTER, RANGE } from "../common/const";
import { Button } from "@mui/material";
import displayMarker from "../util/displayMarker";

const KakaoMapContainer = () => {
  const { kakao } = window;
  const [closestPlace, setClosestPlace] = useState({});

  let map;
  let ps = new kakao.maps.services.Places();
  let current_position = { lat: KT_CENTER.Y, lng: KT_CENTER.X };

  const init = () => {
    let $mapContainer = document.getElementById("map");
    let mapOption = {
      center: new kakao.maps.LatLng(KT_CENTER.Y, KT_CENTER.X),
      level: 5,
    };
    map = new kakao.maps.Map($mapContainer, mapOption);
    let markerPosition = new kakao.maps.LatLng(KT_CENTER.Y, KT_CENTER.X);
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    displayMarker({ y: KT_CENTER.Y, x: KT_CENTER.X }, map);
  };

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
      let bounds = new kakao.maps.LatLngBounds();
      let minIndex;
      let minDistance = 1e9;

      for (let i = 0; i < data.length; i++) {
        const { y, x } = data[i];
        const distance = haversine(current_position, { lat: y, lng: x }) / 1000;

        if (distance >= RANGE.MAX) continue;
        if (distance <= minDistance) minIndex = i;

        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      displayMarker(data[minIndex], map);
      map.setBounds(bounds);
      setClosestPlace(data[minIndex]);
      speakDestination("minAddress");
    }
  }

  const onClick = () => {
    init();
    ps.keywordSearch("졸음 쉼터", placesSearchCB);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <KakaoMapContainerBlock>
        <div id="map" style={{ width: "600px", height: "400px" }} />
        {closestPlace && <KaKaoMapPresenter {...{ closestPlace }} />}
        <Button
          onClick={() => {
            speakDestination(closestPlace.address_name);
          }}
        >
          다시 듣기
        </Button>
        <Button
          onClick={() => {
            onClick();
          }}
        >
          재요청
        </Button>
      </KakaoMapContainerBlock>
    </>
  );
};

export default KakaoMapContainer;

const KakaoMapContainerBlock = styled.div`
  /* display: flex; */
`;
