import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ロゴのスプリングアニメーション
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 2 * fps,
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.8, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // サービス名のアニメーション
  const titleSpring = spring({
    frame: frame - 1.2 * fps,
    fps,
    config: { damping: 200 },
    durationInFrames: 1.5 * fps,
  });

  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // キャッチコピーのアニメーション
  const taglineSpring = spring({
    frame: frame - 1.8 * fps,
    fps,
    config: { damping: 200 },
    durationInFrames: 1.5 * fps,
  });

  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);

  // サブタイトルのテキスト（文字ごとに表示）
  const fullText =
    "旅行の振り返りを AI で、簡単に、便利に、そして、もっとエモく";
  const charsToShow = Math.floor(
    interpolate(frame, [2 * fps, 4 * fps], [0, fullText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    }),
  );

  return (
    <AbsoluteFill>
      {/* シンプルな背景グラデーション */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        }}
      />

      {/* メインコンテンツコンテナ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{ position: "relative", width: "100%", textAlign: "center" }}
        >
          {/* ロゴプレースホルダー - カメラアイコン */}
          <div
            style={{
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
              display: "inline-block",
              marginBottom: 50,
            }}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: "50%",
                padding: 36,
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                  width: 120,
                  height: 120,
                  color: "#475569",
                }}
              >
                <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                <path
                  fillRule="evenodd"
                  d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* サービス名 */}
          <div
            style={{
              transform: `translateY(${titleY}px)`,
              opacity: titleOpacity,
              marginBottom: 30,
            }}
          >
            <h1
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              Tavinikkiy Agent
            </h1>

            {/* シンプルなアンダーライン */}
            <div
              style={{
                height: 2,
                width: 120,
                background: "#3b82f6",
                margin: "0 auto",
              }}
            />
          </div>

          {/* キャッチコピー */}
          <div
            style={{
              opacity: taglineOpacity,
              textAlign: "center",
              paddingLeft: 80,
              paddingRight: 80,
              marginTop: 40,
            }}
          >
            <p
              style={{
                fontSize: 28,
                color: "#cbd5e1",
                fontWeight: 400,
                letterSpacing: "0.01em",
                lineHeight: 1.7,
              }}
            >
              {fullText.slice(0, charsToShow)}
              {charsToShow < fullText.length && (
                <span
                  style={{
                    opacity: Math.sin((frame / fps) * Math.PI * 4) > 0 ? 1 : 0,
                  }}
                >
                  |
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
