import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const CreditScene: React.FC = () => {
  const frame = useCurrentFrame();

  // フェードインアニメーション
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // タイトルのアニメーション
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(frame, [0, 25], [0.9, 1], {
    extrapolateRight: "clamp",
  });

  // Gopherのアニメーション
  const gopherScale = interpolate(frame, [0, 40], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  const gopherY = interpolate(frame, [0, 40], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #00ADD8 0%, #00E5FF 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          opacity,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
        }}
      >
        {/* 祝！Go1.26リリース */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: "900",
              color: "white",
              fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
              textShadow: "0 4px 12px rgba(0,0,0,0.2)",
              margin: 0,
              letterSpacing: 2,
            }}
          >
            🎉 祝！Go 1.26リリース 🎉
          </h1>
        </div>

        {/* Gopherイラスト */}
        <div
          style={{
            transform: `scale(${gopherScale}) translateY(${gopherY}px)`,
          }}
        >
          <Img
            src={staticFile("happy.png")}
            style={{
              width: 400,
              height: 400,
              objectFit: "contain",
            }}
          />
        </div>

        {/* クレジット表記 */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "40px 60px",
            borderRadius: 24,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: "#333",
              fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
              fontWeight: "500",
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            The Go gopher was designed by Renée French.
            <br />
            Illustrations by tottie.
            <br />
            <span
              style={{
                fontSize: 28,
                color: "#666",
                marginTop: 10,
                display: "inline-block",
              }}
            >
              ©tottie / Renée French
            </span>
          </div>
        </div>
        {/* 音楽のクレジット それゆけワンダーランド／騒音のない世界 */}
        <div
          style={{
            fontSize: 28,
            color: "#666",
            marginTop: 10,
            textAlign: "center",
            fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
            fontWeight: "500",
          }}
        >
          音楽: それゆけワンダーランド／騒音のない世界
        </div>
      </div>
    </AbsoluteFill>
  );
};
