import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const SetupScene: React.FC = () => {
  const frame = useCurrentFrame();

  // タイトルのアニメーション
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // コマンドのアニメーション
  const cmdOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  // ボトム情報のアニメーション
  const bottomOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #00ADD8 0%, #0097B2 100%)",
        padding: 60,
        justifyContent: "space-between",
      }}
    >
      {/* タイトルセクション */}
      <div style={{ opacity: titleOpacity, marginTop: 300 }}>
        <h1
          style={{
            fontSize: 88,
            fontWeight: "800",
            color: "white",
            textAlign: "center",
            fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
            marginBottom: 20,
          }}
        >
          アップグレード
        </h1>
        <div
          style={{
            width: 200,
            height: 6,
            background: "linear-gradient(90deg, #00E5FF, #00ADD8)",
            margin: "0 auto",
            borderRadius: 3,
          }}
        />
      </div>

      {/* メインコマンド */}
      <div
        style={{
          opacity: cmdOpacity,
          transform: `scale(${interpolate(cmdOpacity, [0, 1], [0.9, 1])})`,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: 50,
            borderRadius: 24,
            border: "3px solid rgba(255,255,255,0.2)",
          }}
        >
          <div
            style={{
              fontSize: 42,
              color: "#FFFFFF",
              fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
              fontWeight: "700",
              marginBottom: 30,
            }}
          >
            macOS / Linux
          </div>
          <pre
            style={{
              fontSize: 56,
              color: "#6EE7B7",
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              margin: 0,
              fontWeight: "700",
            }}
          >
            brew upgrade go
          </pre>
        </div>

        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: 50,
            borderRadius: 24,
            border: "3px solid rgba(255,255,255,0.2)",
          }}
        >
          <div
            style={{
              fontSize: 42,
              color: "#FFFFFF",
              fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
              fontWeight: "700",
              marginBottom: 30,
            }}
          >
            または公式サイトから
          </div>
          <pre
            style={{
              fontSize: 52,
              color: "#93C5FD",
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              margin: 0,
              fontWeight: "700",
            }}
          >
            go.dev/dl/
          </pre>
        </div>
      </div>

      {/* ボトム情報 */}
      <div
        style={{
          opacity: bottomOpacity,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 40,
            color: "rgba(255,255,255,0.8)",
            fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
            fontWeight: "500",
          }}
        >
          📅　2025年2月11日リリース
        </div>
        <div
          style={{
            fontSize: 48,
            color: "white",
            fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
            fontWeight: "700",
          }}
        >
          #golang
        </div>
      </div>
    </AbsoluteFill>
  );
};
