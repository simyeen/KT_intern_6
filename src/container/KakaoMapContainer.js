import React, { useEffect, useState } from "react";
import styled from "styled-components";
import haversine from "haversine-distance";
import speakDestination from "../util/speakDestination";
import KaKaoMapPresenter from "../presenter/KaKaoMapPresenter";
import { RANGE, SEARCH_PLACE } from "../common/const";
import { Button } from "@mui/material";
import displayMarker from "../util/displayMarker";
import color from "../common/color";
import EventListener from "./EventListener";

const KakaoMapContainer = ({ isEventOn, location }) => {
  const { kakao } = window;
  const [closestPlace, setClosestPlace] = useState("");
  const [closestDistance, setClosestDistance] = useState("");

  let map;
  let ps = new kakao.maps.services.Places();
  let current_position = { lat: location.latitude, lng: location.longitude };

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
        if (distance <= minDistance) {
          minIndex = i;
          minDistance = distance;
        }
      }

      bounds.extend(
        new kakao.maps.LatLng(location.latitude, location.longitude)
      );
      bounds.extend(new kakao.maps.LatLng(data[minIndex].y, data[minIndex].x));
      map.setBounds(bounds);
      displayMarker(data[minIndex], map, location);
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
      <KakaoMapContainerBlock>
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
            <KaKaoMapPresenter
              {...{ closestPlace }}
              {...{ closestDistance }}
              {...{ isEventOn }}
            />
          )}
        </Container>
        <SpeakButton id="btn"></SpeakButton>
      </KakaoMapContainerBlock>
    </>
  );
};

export default KakaoMapContainer;

const KakaoMapContainerBlock = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px;
`;

const ButtonContainer = styled.div``;

const SpeakButton = styled.div`
  display: none;
`;
