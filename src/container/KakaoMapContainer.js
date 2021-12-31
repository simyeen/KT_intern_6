import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import haversine from "haversine-distance";

const KakaoMapContainer = () => {
  const { kakao } = window;
  const closestPosition = useRef({
    distance: 1e9,
    index: 0,
  });

  const [dataList, setDataList] = useState([]);

  const kakaoMapInit = () => {
    let current_y = 37.359775085276;
    let current_x = 127.11468651854;
    let current_position = { lat: current_y, lng: current_x };

    let mapContainer = document.getElementById("map");
    let mapOption = {
      center: new kakao.maps.LatLng(current_y, current_x),
      level: 5,
    };
    let map = new kakao.maps.Map(mapContainer, mapOption);

    let markerPosition = new kakao.maps.LatLng(current_y, current_x);
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    let ps = new kakao.maps.services.Places();

    ps.keywordSearch("졸음 쉼터", placesSearchCB);

    // ps.categorySearch("PK6", placesSearchCB, {
    //   location: new kakao.maps.LatLng(current_y, current_x),
    // });
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        let bounds = new kakao.maps.LatLngBounds();

        setDataList(data);
        for (let i = 0; i < data.length; i++) {
          let data_position = {
            lat: parseFloat(data[i].y),
            lng: parseFloat(data[i].x),
          };

          const distance = haversine(current_position, data_position) / 1000;

          if (distance >= 20) {
            continue;
          } else if (distance <= closestPosition.current.distance) {
            closestPosition.current = {
              ...closestPosition.current,
              distance,
              index: i,
            };
            // console.log(cslosestPosition.current);
          }
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        let index = closestPosition.current.index;
        console.log(data[closestPosition.current.index]);

        displayMarker(data[index]);
        // bounds.extend(new kakao.maps.LatLng(data[index].y, data[index].x));
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다.
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        console.log("info", infowindow);
        infowindow.open(map, marker);
      });
    }
  };

  useEffect(() => {
    kakaoMapInit();
  }, []);

  return (
    <>
      <KakaoMapContainerBlock>
        <div id="map" style={{ width: "600px", height: "400px" }} />
        {dataList.map((data, index) => {
          const { address_name, road_address_name } = data;
          return <li key={index}>{address_name}</li>;
        })}
      </KakaoMapContainerBlock>
    </>
  );
};

export default KakaoMapContainer;

const KakaoMapContainerBlock = styled.div`
  /* display: flex; */
`;

const DataCotainer = styled.div``;
