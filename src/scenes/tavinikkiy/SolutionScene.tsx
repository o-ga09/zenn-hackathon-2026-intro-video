import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from "remotion";

const SolutionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  bgColor: string;
}> = ({ icon, title, description, accentColor, bgColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // エントランスアニメーション
  const entranceSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 1.2 * fps,
  });

  const scale = interpolate(entranceSpring, [0, 1], [0.9, 1]);
  const opacity = interpolate(entranceSpring, [0, 1], [0, 1]);
  const y = interpolate(entranceSpring, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, calc(-50% + ${y}px)) scale(${scale})`,
        opacity,
        width: "85%",
        maxWidth: "1100px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 24,
          padding: "70px 80px",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.08)",
          border: `2px solid ${bgColor}`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 36,
          }}
        >
          {/* アイコン */}
          <div
            style={{
              background: `linear-gradient(135deg, ${bgColor} 0%, ${accentColor}20 100%)`,
              borderRadius: 20,
              padding: 28,
              color: accentColor,
              boxShadow: `0 4px 16px ${accentColor}25`,
            }}
          >
            {icon}
          </div>

          {/* タイトル */}
          <h3
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#1e293b",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h3>

          {/* 説明文 */}
          <p
            style={{
              fontSize: 28,
              color: "#475569",
              lineHeight: 1.7,
              letterSpacing: "0.005em",
              fontWeight: 400,
              maxWidth: "90%",
            }}
          >
            {description}
          </p>

          {/* アクセントライン */}
          <div
            style={{
              width: 100,
              height: 3,
              background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}80 100%)`,
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // タイトルのアニメーション
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 1.2 * fps,
  });

  const titleY = interpolate(titleSpring, [0, 1], [-50, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // サービス名のハイライトアニメーション
  const highlightSpring = spring({
    frame: frame - 0.4 * fps,
    fps,
    config: { damping: 200 },
    durationInFrames: 1.2 * fps,
  });

  const highlightScale = interpolate(highlightSpring, [0, 1], [0.95, 1]);

  // タイトルは常に表示（フェードアウトしない）
  const titleScale = interpolate(frame, [0, 4 * fps], [1, 0.85], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const CARD1_DURATION = 5 * fps;
  const CARD2_DURATION = 5 * fps;
  const CARD3_DURATION = 5 * fps;

  return (
    <AbsoluteFill style={{ position: "relative" }}>
      {/* 楽しい背景グラデーション */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #dbeafe 0%, #e9d5ff 50%, #fce7f3 100%)",
        }}
      />

      {/* 装飾的なパターン - ドット */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, #7c3aed 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.08,
        }}
      />

      {/* 装飾的な円 */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -120,
          width: 450,
          height: 450,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
        }}
      />

      {/* タイトルエリア - 固定表示 */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          opacity: titleOpacity,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#1e293b",
            marginBottom: 24,
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}
        >
          <span
            style={{
              transform: `scale(${highlightScale})`,
              display: "inline-block",
              background:
                "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Tavinikkiy Agent
          </span>
          <br />
          が解決します
        </h2>
        <div
          style={{
            height: 4,
            width: 150,
            background:
              "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
            margin: "0 auto",
            borderRadius: 2,
          }}
        />
      </div>

      {/* コンテンツエリア */}
      <div
        className="flex flex-col items-center justify-center"
        style={{ position: "relative", height: "100%", paddingTop: 60 }}
      >
        {/* ソリューションカード1 */}
        <Sequence from={4 * fps} durationInFrames={CARD1_DURATION}>
          <SolutionCard
            accentColor="#3b82f6"
            bgColor="#dbeafe"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                style={{ width: 72, height: 72 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            }
            title="クラウド保存"
            description="素材となる画像・動画、生成された画像・動画は、クラウド保存なのでモバイル端末の容量を気にしなくても大丈夫"
          />
        </Sequence>

        {/* ソリューションカード2 */}
        <Sequence
          from={4 * fps + CARD1_DURATION}
          durationInFrames={CARD2_DURATION}
        >
          <SolutionCard
            accentColor="#8b5cf6"
            bgColor="#e9d5ff"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                style={{ width: 72, height: 72 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            }
            title="AI自動生成"
            description="ユーザーは旅行で撮った写真をアップロードするだけであとは、AIが勝手に素材を分析してエモい動画を作成"
          />
        </Sequence>

        {/* ソリューションカード3 */}
        <Sequence
          from={4 * fps + CARD1_DURATION + CARD2_DURATION}
          durationInFrames={CARD3_DURATION}
        >
          <SolutionCard
            accentColor="#ec4899"
            bgColor="#fce7f3"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                style={{ width: 72, height: 72 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            }
            title="スマホで完結"
            description="ユーザーは素材となるモバイル端末にある画像や動画をアップロードするだけなのでPCいらず"
          />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
