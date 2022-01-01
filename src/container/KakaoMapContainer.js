import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import speakDestination from "../util/speakDestination";
import KaKaoMapPresenter from "../presenter/KaKaoMapPresenter";
import PlaceSearch from "../util/PlacesSearch";
import { KT_CENTER } from "../common/const";

const KakaoMapContainer = () => {
  const { kakao } = window;
  const closestPosition = useRef({
    distance: 1e9,
    index: 0,
  });
  const [minAddressState, setMinAddressState] = useState("");
  const [dataList, setDataList] = useState([]);

  const kakaoMapInit = () => {
    let $mapContainer = document.getElementById("map");
    let mapOption = {
      center: new kakao.maps.LatLng(KT_CENTER.Y, KT_CENTER.X),
      level: 5,
    };
    let map = new kakao.maps.Map($mapContainer, mapOption);

    let markerPosition = new kakao.maps.LatLng(KT_CENTER.Y, KT_CENTER.X);
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
    const ps = new PlaceSearch(map);
    console.log(ps);

    ps.keywordSearch();
  };

  useEffect(() => {
    kakaoMapInit();
  }, []);

  return (
    <>
      <KakaoMapContainerBlock>
        <div id="map" style={{ width: "600px", height: "400px" }} />
        {/* {dataList.map((data, index) => (
          <KaKaoMapPresenter {...{ data }} key={index} />
        ))} */}
        {/* <KaKaoMapPresenter /> */}
        <button
          onClick={() => {
            speakDestination({ minAddressState });
          }}
        >
          다시 듣기
        </button>
        <button
          onClick={() => {
            speakDestination({ replay: true, minAddressState });
          }}
        >
          재탐색
        </button>
      </KakaoMapContainerBlock>
    </>
  );
};

export default KakaoMapContainer;

const KakaoMapContainerBlock = styled.div`
  /* display: flex; */
`;
