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
