// iot Makers 플랫폼의 이벤트발생을 확인하는 EventListener Component입니다.

import React, { useEffect } from "react";
import axios from "axios";
import $ from "jquery";

const EventListener = ({ reStart }) => {
  let token;

  // 1. 비동기 요청으로 Iot Makers access_token을 얻어옵니다.
  const onEvent = async () => {
    try {
      let appId = `${process.env.REACT_APP_IOT_MAKERS_APP_ID}`;
      let secret = `${process.env.REACT_APP_IOT_MAKERS_SECRET}`;

      await $.ajax({
        url: "https://iotmakers.kt.com/oauth/token",
        method: "POST",
        xhrFields: { withCredentials: true },
        headers: { Authorization: "Basic " + btoa(appId + ":" + secret) },
        data: {
          grant_type: "password",
          username: `${process.env.REACT_APP_IOT_MAKERS_USER_NAME}`,
          password: `${process.env.REACT_APP_IOT_MAKERS_PASSWORD}`,
        },
        success: function (result) {
          token = result.access_token;
        },
        error: function (xhr, status, error) {
          console.log(xhr, status, error);
        },
      });

      // 2. 얻어온 token으로 필요한 API를 요청합니다.
      //    아래 요청은 가장 최근에 발생한 Touch event를 확인하는 부분입니다.
      let { data } = await axios.get(
        "https://iotmakers.kt.com:443/api/v1/streams/sharonD1641177528255/log/last",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 3. 만약, Touch 패드를 눌렀다면
      // reStart() (가장 가까운 졸음 쉼터를 지도 및 음성으로 다시 알려주는 함수)를 실행합니다.
      console.log("iot에서의 touch", data.data[0].attributes);
      if (data.data[0].attributes.Touch === 1) {
        reStart();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 4. setInterval를 통해 주기적으로 비동기 요청을 보내며 event를 확인합니다.
  useEffect(() => {
    let intervalIot = setInterval(onEvent, 1000);
  }, []);

  return <></>;
};

export default EventListener;
