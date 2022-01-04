import React from "react";
import axios from "axios";
import $ from "jquery";
import speakDestination from "../util/speakDestination";

const EventListener = ({ setIsEventOn }) => {
  let token;

  const onEvent = async () => {
    try {
      let appId = "64DFVbvmxjGV9IYG";
      let secret = "CwFXcj55NySZtnAY";

      await $.ajax({
        url: "https://iotmakers.kt.com/oauth/token",
        method: "POST",
        xhrFields: { withCredentials: true },
        headers: { Authorization: "Basic " + btoa(appId + ":" + secret) },
        data: {
          grant_type: "password",
          username: "sharon1998",
          password: "qwerasdf1!",
        },
        success: function (result) {
          token = result.access_token;
        },
        error: function (xhr, status, error) {
          console.log(xhr);
        },
      });

      let { data } = await axios.get(
        "https://iotmakers.kt.com:443/api/v1/streams/sharonD1641177528255/log/last",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("이벤트 감지 touch", data.data[0].attributes.Touch);

      if (data.data[0].attributes.Touch === 1) {
        onStop();
        setIsEventOn(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  let iotMarkersEventListener = setInterval(onEvent, 1000);

  const onStop = () => {
    console.log("종료");
    clearInterval(iotMarkersEventListener);
  };
  return <></>;
};

export default EventListener;
