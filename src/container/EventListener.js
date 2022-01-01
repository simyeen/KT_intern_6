import React from "react";
import axios from "axios";

const EventListener = ({ setIsEventOn }) => {
  let runTime = 0;

  const checkEvent = async () => {
    try {
      console.log("이벤트 감지 요청");
      if (runTime !== 0) {
        onStop();
        setIsEventOn(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  let iotMarkersEventListener = setInterval(checkEvent, 1000);

  const count = () => {
    runTime++;
    console.log(runTime);
  };

  const onStop = () => {
    console.log("종료");
    clearInterval(iotMarkersEventListener);
  };

  return (
    <>
      <button
        onClick={() => {
          onStop();
        }}
      >
        나는 api 감지종료 버튼
      </button>
      <button onClick={count}>트리거 버튼</button>
    </>
  );
};

export default EventListener;
