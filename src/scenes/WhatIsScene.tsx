import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const WhatIsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // タイトルのアニメーション
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 各特徴のアニメーション（順次表示）
  const feature1Opacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const feature2Opacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateRight: "clamp",
  });
  const feature3Opacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateRight: "clamp",
  });
  const feature4Opacity = interpolate(frame, [60, 75], [0, 1], {
    extrapolateRight: "clamp",
  });

  const features = [
    {
      icon: "🚀",
      title: "Green Tea GC",
      subtitle: "GC性能10-40%向上",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      opacity: feature1Opacity,
    },
    {
      icon: "⚡",
      title: "go fix刷新",
      subtitle: "自動コード最適化",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      opacity: feature2Opacity,
    },
    {
      icon: "🔒",
      title: "SIMD対応",
      subtitle: "高速ベクトル演算",
      gradient: "linear-gradient(135deg, #00ADD8 0%, #00E5FF 100%)",
      opacity: feature3Opacity,
    },
    {
      icon: "🛡️",
      title: "量子後暗号",
      subtitle: "ML-KEM統合",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      opacity: feature4Opacity,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #ffeef8 0%, #e0f7ff 100%)",
        padding: 60,
        justifyContent: "center",
      }}
    >
      <div style={{ opacity: titleOpacity, marginBottom: 50 }}>
        <h1
          style={{
            fontSize: 88,
            fontWeight: "800",
            color: "#333",
            textAlign: "center",
            fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
            marginBottom: 20,
          }}
        >
          主要な新機能
        </h1>
        <div
          style={{
            width: 200,
            height: 6,
            background: "linear-gradient(90deg, #00ADD8, #f093fb)",
            margin: "0 auto",
            borderRadius: 3,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              opacity: feature.opacity,
              background: feature.gradient,
              padding: 40,
              borderRadius: 24,
              transform: `translateX(${interpolate(
                feature.opacity,
                [0, 1],
                [50, 0],
              )}px)`,
              display: "flex",
              alignItems: "center",
              gap: 30,
            }}
          >
            <div style={{ fontSize: 80 }}>{feature.icon}</div>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: 56,
                  fontWeight: "700",
                  color: "white",
                  marginBottom: 8,
                  fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: 36,
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "'Poppins', 'M PLUS Rounded 1c', sans-serif",
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                {feature.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
