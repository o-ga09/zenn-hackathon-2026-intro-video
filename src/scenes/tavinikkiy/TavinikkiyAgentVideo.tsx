import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { OpeningScene } from "./OpeningScene";
import { ProblemScene } from "./ProblemScene";
import { SolutionScene } from "./SolutionScene";
import { FeatureDemoScene } from "./FeatureDemoScene";
import { ClosingScene } from "./ClosingScene";

export const TavinikkiyAgentVideo: React.FC = () => {
  // シーンの長さ（秒単位で定義してfpsで乗算）
  const fps = 30;

  const OPENING_DURATION = 7 * fps; // 210フレーム
  const PROBLEM_DURATION = 17 * fps; // 510フレーム
  const SOLUTION_DURATION = 20 * fps; // 600フレーム
  const FEATURE_DEMO_DURATION = 60 * fps; // 1800フレーム
  const CLOSING_DURATION = 12 * fps; // 360フレーム

  // スプリングタイミングを使用した自然なトランジション
  const smoothSpringTiming = springTiming({
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill>
      {/* BGM追加 */}
      <Html5Audio src={staticFile("umbrella.wav")} trimBefore={40} />
      <TransitionSeries>
        {/* オープニングシーン */}
        <TransitionSeries.Sequence durationInFrames={OPENING_DURATION}>
          <OpeningScene />
        </TransitionSeries.Sequence>

        {/* オープニング → 課題提示 トランジション（スライド） */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={smoothSpringTiming}
        />

        {/* 課題提示シーン */}
        <TransitionSeries.Sequence durationInFrames={PROBLEM_DURATION}>
          <ProblemScene />
        </TransitionSeries.Sequence>

        {/* 課題提示 → ソリューション紹介 トランジション（フェード） */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={smoothSpringTiming}
        />

        {/* ソリューション紹介シーン */}
        <TransitionSeries.Sequence durationInFrames={SOLUTION_DURATION}>
          <SolutionScene />
        </TransitionSeries.Sequence>

        {/* ソリューション紹介 → 機能デモ トランジション（スライド） */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={smoothSpringTiming}
        />

        {/* 機能デモシーン */}
        <TransitionSeries.Sequence durationInFrames={FEATURE_DEMO_DURATION}>
          <FeatureDemoScene />
        </TransitionSeries.Sequence>

        {/* 機能デモ → クロージング トランジション（フェード） */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={smoothSpringTiming}
        />

        {/* クロージングシーン */}
        <TransitionSeries.Sequence durationInFrames={CLOSING_DURATION}>
          <ClosingScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

// 合計時間の計算（参考用）
// 総シーン時間: 210 + 510 + 600 + 1800 + 360 = 3480フレーム
// スプリングトランジションの長さは物理シミュレーションに基づいて自動計算される
// 実際の合計時間は約116秒 = 1分56秒程度（トランジションがオーバーラップするため）
