import axios from "axios";

// 지도에서 얻어낸 가장 가까운 목적지를 음성으로 알려줍니다.
const speakDestination = async ({ replay = false, text }) => {
  let replayText = replay ? "위치를 재 탐색합니다. 잠시만 기다려주세요" : "";

  const xmlData = `<speak>${replayText}. 일어나세요 휴먼. 가장 가까운 곳은 ${text} 입니다.</speak>`;
  try {
    const { data } = await axios.post(
      "https://kakaoi-newtone-openapi.kakao.com/v1/synthesize",
      xmlData,
      {
        headers: {
          "Content-Type": "application/xml",
          Authorization: `KakaoAK db3bb37a8a4e03a522400cc0a94ba0b7`,
        },
        responseType: "arraybuffer",
      }
    );

    const context = new AudioContext();
    context.decodeAudioData(data, (buffer) => {
      console.log("TTS");
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
  } catch (e) {
    console.error(e.message);
  }
};

export default speakDestination;
