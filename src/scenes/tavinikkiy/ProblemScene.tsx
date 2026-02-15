import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from "remotion";

const ProblemCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
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
          border: "2px solid #fee2e2",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 50 }}>
          {/* アイコン */}
          <div
            style={{
              flexShrink: 0,
              background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
              borderRadius: 20,
              padding: 28,
              color: "#dc2626",
              boxShadow: "0 4px 16px rgba(220, 38, 38, 0.15)",
            }}
          >
            {icon}
          </div>

          {/* テキストコンテンツ */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#1e293b",
                marginBottom: 24,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: 28,
                color: "#475569",
                lineHeight: 1.7,
                letterSpacing: "0.005em",
                fontWeight: 400,
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProblemScene: React.FC = () => {
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

  // タイトルは常に表示（フェードアウトしない）
  const titleScale = interpolate(frame, [0, 2.5 * fps], [1, 0.85], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const CARD_DURATION = 5 * fps;

  return (
    <AbsoluteFill style={{ position: "relative" }}>
      {/* 楽しい背景グラデーション */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #fef2f2 0%, #fce7f3 50%, #fef3c7 100%)",
        }}
      />

      {/* 装飾的なパターン - ドット */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, #fb7185 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.1,
        }}
      />

      {/* 装飾的な円 */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251, 113, 133, 0.15) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(252, 165, 165, 0.15) 0%, transparent 70%)",
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
          }}
        >
          こんな経験はありませんか？
        </h2>
        <div
          style={{
            height: 4,
            width: 120,
            background: "linear-gradient(90deg, #dc2626 0%, #f87171 100%)",
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
        {/* 課題カード1 */}
        <Sequence from={2.5 * fps} durationInFrames={CARD_DURATION}>
          <ProblemCard
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="動画編集が面倒"
            description="旅行の楽しい思い出をたくさん記録に残したが、振り返りのためにアルバム調のスライドショーやVlog調の動画作成が面倒"
          />
        </Sequence>

        {/* 課題カード2 */}
        <Sequence
          from={2.5 * fps + CARD_DURATION}
          durationInFrames={CARD_DURATION}
        >
          <ProblemCard
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
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            }
            title="ストレージ容量の圧迫"
            description="旅行の楽しい思い出をたくさん記録したが、モバイル端末のディスク容量の関係で削除しなければいけない"
          />
        </Sequence>

        {/* 課題カード3 */}
        <Sequence
          from={2.5 * fps + CARD_DURATION * 2}
          durationInFrames={CARD_DURATION}
        >
          <ProblemCard
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
            title="PCがなくてもできる？"
            description="PCはないので、スマートフォンだけでさくっと手軽に作成して共有したい"
          />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
