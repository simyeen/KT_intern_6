export default function getLocation() {
  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      function ({ coords }) {
        // alert(position.coords.latitude + " " + position.coords.longitude);
        console.log(coords);
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
}
