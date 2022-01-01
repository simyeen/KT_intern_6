import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import haversine from "haversine-distance";
import speakDestination from "../util/speakDestination";
import displayMarker from "../util/displayMarker";
import KaKaoMapPresenter from "../presenter/KaKaoMapPresenter";
import PlaceSearch from "../util/placesSearchCB";

const KakaoMapContainer = () => {
  const { kakao } = window;
  const closestPosition = useRef({
    distance: 1e9,
    index: 0,
  });
  const [minAddressState, setMinAddressState] = useState("");
  const [dataList, setDataList] = useState([]);

  const kakaoMapInit = () => {
    let current_y = 37.359775085276;
    let current_x = 127.11468651854;
    let current_position = { lat: current_y, lng: current_x };

    let $mapContainer = document.getElementById("map");
    let mapOption = {
      center: new kakao.maps.LatLng(current_y, current_x),
      level: 5,
    };
    let map = new kakao.maps.Map($mapContainer, mapOption);

    let markerPosition = new kakao.maps.LatLng(current_y, current_x);
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
            speakDestination(minAddressState);
          }}
        >
          다시 듣기
        </button>
        <button>재실행</button>
      </KakaoMapContainerBlock>
    </>
  );
};

export default KakaoMapContainer;

const KakaoMapContainerBlock = styled.div`
  /* display: flex; */
`;
