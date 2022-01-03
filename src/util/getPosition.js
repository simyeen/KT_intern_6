export default function getLocation() {
  let lat;
  let lng;

  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      function ({ coords }) {
        lat = coords.latitude;
        lng = coords.longitude;
      },
      function (error) {
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  } else {
    alert("GPS를 지원하지 않습니다");
  }

  return [lat, lng];
}
