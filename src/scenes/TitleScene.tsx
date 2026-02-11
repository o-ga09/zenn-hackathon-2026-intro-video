import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();

  // フェードインアニメーション
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // スケールアニメーション
  const scale = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  // バージョンバッジのアニメーション
  const badgeOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #00ADD8 0%, #0077B5 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
          width: "100%",
        }}
      >
        {/* NEW バッジ */}
        <div
          style={{
            opacity: badgeOpacity,
            backgroundColor: "#00E5FF",
            color: "#003366",
            fontSize: 42,
            fontWeight: "bold",
            padding: "12px 40px",
            borderRadius: 50,
            display: "inline-block",
            marginBottom: 40,
            fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
            letterSpacing: 4,
          }}
        >
          NEW
        </div>

        {/* Goのロゴ風のスタイリング */}
        <div
          style={{
            fontSize: 240,
            fontWeight: "900",
            color: "white",
            fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
            marginBottom: 20,
            textShadow: "0 8px 16px rgba(0,0,0,0.3)",
            lineHeight: 1,
          }}
        >
          Go
        </div>
        <div
          style={{
            fontSize: 120,
            color: "white",
            fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
            fontWeight: "800",
            letterSpacing: 8,
            marginBottom: 30,
          }}
        >
          1.26
        </div>
        <div
          style={{
            fontSize: 52,
            color: "rgba(255,255,255,0.9)",
            fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
            fontWeight: 500,
            letterSpacing: 3,
          }}
        >
          2025年2月11日リリース
        </div>
      </div>
    </AbsoluteFill>
  );
};
