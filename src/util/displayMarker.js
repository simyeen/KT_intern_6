import { KT_CENTER } from "../common/const";

const { kakao } = window;

export default function displayMarker(place, map) {
  // 마커를 생성하고 지도에 표시합니다
  let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  let marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  if (place.x === KT_CENTER.X) {
    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;"> 출발지 </div>'
    );
  } else {
    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>"
    );
  }

  infowindow.open(map, marker);
}
