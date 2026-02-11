import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Html5Audio, staticFile } from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { WhatIsScene } from "./scenes/WhatIsScene";
import { SetupScene } from "./scenes/SetupScene";
import { CreditScene } from "./scenes/CreditScene";

const TRANSITION_DURATION = 15;
const SCENE_DURATION = 150; // 5 seconds per scene
const CREDIT_DURATION = 120; // 4 seconds for credit

export const AgentTeamsVideo: React.FC = () => {
  return (
    <>
      {/* BGM追加 */}
      <Html5Audio src={staticFile("wonderland.wav")} trimBefore={40} />

      <TransitionSeries>
        {/* durationInFrames で指定した フレーム数だけタイトルシーンが表示される */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <TitleScene />
        </TransitionSeries.Sequence>
        {/* フェードインアウトのトランジションを追加 */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <WhatIsScene />
        </TransitionSeries.Sequence>
        {/* ここからはスライドインのトランジションになる */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <SetupScene />
        </TransitionSeries.Sequence>
        {/* クレジットへのトランジション */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={CREDIT_DURATION}>
          <CreditScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
