import haversine from "haversine-distance";
import { KT_CENTER } from "../common/const";

let current_position = { lat: KT_CENTER.Y, lng: KT_CENTER.X };

export default class PlaceSearch {
  constructor(map) {
    this.kakao = window.kakao;
    this.map = map;
    this.ps = new this.kakao.maps.services.Places();
    this.infowindow = new this.kakao.maps.InfoWindow({ zIndex: 1 });
    console.log(this.map, this.kakao, this.ps);
  }

  keywordSearch() {
    console.log(this);
    this.ps.keywordSearch("졸음 쉼터", this.placesSearchCB.bind(this));
  }

  placesSearchCB(data, status, pagination) {
    if (status === this.kakao.maps.services.Status.OK) {
      let bounds = new this.kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        bounds.extend(new this.kakao.maps.LatLng(data[i].y, data[i].x));
        this.displayMarker(data[i]);
      }

      this.map.setBounds(bounds);
    }
  }

  // 지도에 마커를 표시하는 함수입니다
  displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    let marker = new this.kakao.maps.Marker({
      map: this.map,
      position: new this.kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    this.kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      this.infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      console.log("info", this.infowindow);
      this.infowindow.open(this.map, marker);
    });
  }
}

// function placesSearchCB(data, status, pagination) {
//   if (status === kakao.maps.services.Status.OK) {
//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//     // LatLngBounds 객체에 좌표를 추가합니다
//     let bounds = new kakao.maps.LatLngBounds();

//     //   setDataList(data);
//     for (let i = 0; i < data.length; i++) {
//       let data_position = {
//         lat: parseFloat(data[i].y),
//         lng: parseFloat(data[i].x),
//       };

//       const distance = haversine(current_position, data_position) / 1000;

//       // if (distance >= 20) {
//       //   continue;
//       // } else if (distance <= closestPosition.current.distance) {
//       //   closestPosition.current = {
//       //     ...closestPosition.current,
//       //     distance,
//       //     index: i,
//       //   };
//       //   // console.log(cslosestPosition.current);
//       // }
//       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
//     }

//     //   let index = closestPosition.current.index;
//     //   console.log(data[closestPosition.current.index]);

//     //   displayMarker(data[index], kakao, infowindow, map);

//     // bounds.extend(new kakao.maps.LatLng(data[index].y, data[index].x));
//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다.
//     map.setBounds(bounds);

//     //   const minAddress = data[index].address_name;
//     //   setMinAddressState(minAddress);
//     //   speakDestination(minAddress);
//   }
// }
