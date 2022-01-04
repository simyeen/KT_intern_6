import React from "react";
import axios from "axios";
import $ from "jquery";

const EventListener = ({ setIsEventOn, isEventOn }) => {
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
          console.log(xhr, status, error);
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

      console.log("iot에서의 touch", data.data[0].attributes.Touch);

      if (Number(data.data[0].attributes.Touch) === 1) {
        console.log("현재 이벤트 값", isEventOn);
        let eventValue = isEventOn;
        setIsEventOn(eventValue + 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  setInterval(onEvent, 1000);

  return <></>;
};

export default EventListener;
