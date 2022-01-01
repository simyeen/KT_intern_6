// 지도에 마커를 표시하는 함수입니다
export default function displayMarker(place, kakao, infowindow, map) {
  // 마커를 생성하고 지도에 표시합니다
  let marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", function () {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>"
    );
    console.log("info", infowindow);
    infowindow.open(map, marker);
  });
}
