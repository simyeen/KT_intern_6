import axios from "axios";
import { VOICE } from "../common/const";

const Speak = () => {
  const context = new AudioContext();

  const start = () => {
    const $speakBtn = document.getElementById("speakBtn");

    $speakBtn.addEventListener("click", () => {
      console.log("speak add이벤트함");
      speakDestination({ init: true });
    });

    $speakBtn.addEventListener("click", function () {
      context.resume().then(() => {
        console.log("Playback resumed successfully");
      });
    });
    $speakBtn.click();
  };

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
      xmlData = `<speak>일어나주세요. ${replayText}. ${initText} 가장 가까운 곳은 ${text} 입니다.</speak>`;
    }

    try {
      const { data } = await axios.post(
        "https://kakaoi-newtone-openapi.kakao.com/v1/synthesize",
        xmlData,
        {
          headers: {
            "Content-Type": "application/xml",
            Authorization: `KakaoAK b7f7a8bbc95d043dc498c800f2a06b28`,
          },
          responseType: "arraybuffer",
        }
      );

      console.log(data);

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

  start();
};

export default Speak;

// 해야될 일

// 1. 버튼을 만든다.
// 2. 이벤트리스너로 오디오 실행기능과 종료기능이 동시에 트리거 되게한다.
