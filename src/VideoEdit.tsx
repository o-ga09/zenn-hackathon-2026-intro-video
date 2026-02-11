/**
 * 既存動画を編集するコンポーネント
 */
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  Img,
} from "remotion";
import { z } from "zod";

export const VideoEditSchema = z.object({
  overlayText: z.string().optional(),
});

export const VideoEdit: React.FC<z.infer<typeof VideoEditSchema>> = ({
  overlayText = "編集例",
}) => {
  const frame = useCurrentFrame();

  // テキストのフェードインアニメーション
  const textOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // テキストの位置アニメーション
  const textTranslateY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  // 1440フレーム以降の字幕用アニメーション
  const announceFrame = Math.max(0, frame - 1440);
  const announceOpacity = interpolate(announceFrame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const announceRotation = interpolate(announceFrame, [0, 40], [180, 0], {
    extrapolateRight: "clamp",
  });
  const announceScale = interpolate(announceFrame, [0, 40], [0.3, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* 既存の動画を読み込み */}
      <OffthreadVideo
        src={staticFile("IMG_2350.MOV")}
        startFrom={6100}
        endAt={8100}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* 動画の上にテキストを重ねる */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sequence from={10}>
          <div
            style={{
              opacity: textOpacity,
              transform: `translateY(${textTranslateY}px)`,
              fontSize: 80,
              fontWeight: "bold",
              color: "white",
              textShadow: "0 4px 20px rgba(0,0,0,0.8)",
              padding: "20px 40px",

              borderRadius: 20,
            }}
          >
            {overlayText}
          </div>
        </Sequence>
      </AbsoluteFill>

      {/* 1440フレームから表示される字幕（回転アニメーション付き） */}
      <Sequence from={1440}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              opacity: announceOpacity,
              transform: `rotate(${announceRotation}deg) scale(${announceScale})`,
              fontSize: 72,
              fontWeight: "900",
              color: "#e8e7e1",
              textShadow:
                "0 0 20px rgba(244, 243, 237, 0.8), 0 0 40px rgba(234, 233, 228, 0.6), 4px 4px 8px rgba(0,0,0,0.8)",
              padding: "30px 50px",
              backgroundColor: "rgba(52, 40, 226, 0.9)",
              borderRadius: 30,
              border: "4px solid #e8e7e1",
              textAlign: "center",
              lineHeight: 1.4,
              maxWidth: "90%",
            }}
          >
            山本彩武道館LIVE
            <br />
            <span style={{ fontSize: 64 }}>2026.7.14 Tue</span>
            <br />
            開催決定！！！
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* 画面下部1/3にキービジュアルの上半分のみを配置して観客を隠す */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("keyvisual.png")}
          style={{
            width: "100%",
            height: "33.33%", // 画面下部1/3に画像の上半分を表示するため
            objectFit: "cover",
            objectPosition: "top", // 画像の上部を表示
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
