// Map을 보여주는 필요한 API를 호출합니다.
// 그리고 얻어낸 data에서 가장 가까운 졸음 쉼터를 얻어내고, 지도에 표시합니다.

import React, { useEffect, useState } from "react";

import { RANGE, SEARCH_PLACE } from "../common/const";
import color from "../common/color";
import speakDestination from "../util/speakDestination";
import displayMarker from "../util/displayMarker";
import MapPresenter from "../presenter/MapPresenter";
import EventListener from "./EventListener";

import { Button } from "@mui/material";
import styled from "styled-components";
import haversine from "haversine-distance";

const MapContainer = ({ isEventOn, location }) => {
  const { kakao } = window;
  const [closestPlace, setClosestPlace] = useState("");
  const [closestDistance, setClosestDistance] = useState("");

  let current_position = { lat: location.latitude, lng: location.longitude };
  let ps = new kakao.maps.services.Places();
  let map;

  // 1. 쿼리선택자로 map이라는 div를 선택합니다.
  // 2. new kakoa.maps.Map 이라는 생성자를 통해서 맵을 생성합니다.
  // 3. displayMaker를 통해서 맵에서 해당 좌표의 Marker를 표시합니다.
  const init = async () => {
    let $mapContainer = document.getElementById("map");
    let mapOption = {
      center: new kakao.maps.LatLng(location.latitude, location.longitude),
      level: 3,
    };
    map = new kakao.maps.Map($mapContainer, mapOption);

    displayMarker(
      { y: location.latitude, x: location.longitude },
      map,
      location
    );
  };

  // 4. 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
      // 5. 지도 위치를 재세팅하거나 마커를 표시하기 위한 bounds를 생성합니다.
      let bounds = new kakao.maps.LatLngBounds();
      let minDistance = 1e9;
      let minIndex;

      // 6. 얻어낸 data를 돌면서 가장 가까운 졸음 쉼터를 얻어냅니다.
      for (let i = 0; i < data.length; i++) {
        const { y, x } = data[i];
        // 7. 위, 경도를 거리로 변환시키는 haversine 라이브러리입니다.
        const distance = haversine(current_position, { lat: y, lng: x }) / 1000;

        if (distance >= RANGE.MAX) continue;
        if (distance <= minDistance) {
          minIndex = i;
          minDistance = distance;
        }
      }

      // 8. 현재 위치한 좌표, 가장 가까운 졸음 쉼터를 기준으로 지도를 재세팅합니다.
      bounds.extend(
        new kakao.maps.LatLng(location.latitude, location.longitude)
      );
      bounds.extend(new kakao.maps.LatLng(data[minIndex].y, data[minIndex].x));
      map.setBounds(bounds);

      displayMarker(data[minIndex], map, location);

      // 9.
      setClosestPlace(data[minIndex]);
      setClosestDistance(minDistance);
      onClickForceEvent(data[minIndex]);
    }
  }

  const onClickForceEvent = (place) => {
    const context = new AudioContext();
    const $btn = document.getElementById("btn");

    $btn.addEventListener("click", () => {
      console.log("Playback1 Play successfully");
      speakDestination({ init: true, text: place.address_name, context });
    });

    $btn.addEventListener("click", function () {
      context.resume().then(() => {
        console.log("Playback2 resumed successfully");
      });
    });
    $btn.click();
  };

  const reStart = () => {
    init();
    ps.keywordSearch(SEARCH_PLACE.SLEEP_CENTER, placesSearchCB);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!isEventOn) {
      return;
    }
    reStart();
  }, [isEventOn]);

  return (
    <>
      <MapContainerBlock>
        <div
          id="map"
          style={{ width: "700px", height: "428px", borderRadius: "25px" }}
        />
        <Container>
          <EventListener {...{ reStart }} />
          <ButtonContainer>
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
                speakDestination({ text: closestPlace.address_name });
              }}
            >
              다시 듣기
            </Button>
          </ButtonContainer>
          {closestPlace && closestDistance && (
            <MapPresenter
              {...{ closestPlace }}
              {...{ closestDistance }}
              {...{ isEventOn }}
            />
          )}
        </Container>
        <SpeakButton id="btn"></SpeakButton>
      </MapContainerBlock>
    </>
  );
};

export default MapContainer;

const MapContainerBlock = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px;
`;

const ButtonContainer = styled.div``;

const SpeakButton = styled.div`
  display: none;
`;
