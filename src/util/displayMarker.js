import { KT_CENTER } from "../common/const";

const { kakao } = window;

export default function displayMarker(place, map) {
  // 마커를 생성하고 지도에 표시합니다

  let marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  let name = place.x === KT_CENTER.X ? "출발지" : "도착지";
  let customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    content: `<div style="padding:0 5px;background:#fff; font-weight:500">${name}</div>`,
    position: new kakao.maps.LatLng(place.y, place.x), // 커스텀 오버레이를 표시할 좌표
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 3.2, // 컨텐츠의 y 위치
  });
}
