import axios from "axios";
import { VOICE } from "../common/const";

// 지도에서 얻어낸 가장 가까운 목적지를 음성으로 알려줍니다.
const speakDestination = async ({
  init = false,
  replay = false,
  text,
  context,
}) => {
  let replayText = replay ? VOICE.REPLAY : "";
  let initText = init ? VOICE.WARNING : "";
  let xmlData;

  if (text === undefined) {
    xmlData = `<speak>아직 경로를 탐색하지 않았습니다. 경로를 탐색해주세요.</speak>`;
  } else {
    xmlData = `<speak>일어나주세요. ${replayText}. 가장 가까운 곳은 ${text} 입니다.</speak>`;
  }

  // 1. 해당 API로 TTS를 요청합니다. 이때 타입은 xml입니다.
  try {
    const { data } = await axios.post(
      "https://kakaoi-newtone-openapi.kakao.com/v1/synthesize",
      xmlData,
      {
        headers: {
          "Content-Type": "application/xml",
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
        },
        responseType: "arraybuffer",
      }
    );

    // 2. Audio를 실행하기위해 context를 생성하고 decode해서 얻은 파일을 재생시킵니다.
    const context = new AudioContext();
    context.decodeAudioData(data, (buffer) => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
  } catch (e) {
    console.error(e.message);
    console.log(e);
  }
};

export default speakDestination;
