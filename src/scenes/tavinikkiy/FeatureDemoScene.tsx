import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  OffthreadVideo,
  staticFile,
} from "remotion";

// スマホフレームコンポーネント
const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative">
      {/* スマホの外枠 */}
      <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl w-[400px] h-[800px]">
        {/* ノッチ */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-900 w-40 h-8 rounded-b-3xl z-10"></div>
        {/* スクリーン */}
        <div className="bg-white rounded-[2.5rem] w-full h-full overflow-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
};

// 動画用の額縁コンポーネント
const VideoFrame: React.FC<{
  children: React.ReactNode;
  width?: number;
  height?: number;
}> = ({ children, width = 1200, height = 675 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 額縁のエントランスアニメーション
  const frameSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 1.5 * fps,
  });

  const frameScale = interpolate(frameSpring, [0, 1], [0.95, 1]);
  const frameOpacity = interpolate(frameSpring, [0, 1], [0, 1]);

  // 光沢のアニメーション
  const shineProgress = interpolate(frame, [0.5 * fps, 2.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        transform: `scale(${frameScale})`,
        opacity: frameOpacity,
        position: "relative",
      }}
    >
      {/* 外側の影 */}
      <div
        style={{
          position: "relative",
          filter: "drop-shadow(0 20px 60px rgba(0, 0, 0, 0.4))",
        }}
      >
        {/* 額縁の外枠 - ゴールド */}
        <div
          style={{
            background:
              "linear-gradient(145deg, #d4af37 0%, #f9e79f 25%, #d4af37 50%, #b8941e 75%, #d4af37 100%)",
            padding: "24px",
            borderRadius: "12px",
            position: "relative",
            width: width + 48,
            boxShadow:
              "inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* 装飾的なコーナー */}
          {[
            { top: 8, left: 8 },
            { top: 8, right: 8 },
            { bottom: 8, left: 8 },
            { bottom: 8, right: 8 },
          ].map((position, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...position,
                width: 32,
                height: 32,
                background: "linear-gradient(135deg, #f9e79f 0%, #d4af37 100%)",
                border: "2px solid #b8941e",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
          ))}

          {/* 光沢エフェクト */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${shineProgress * 120 - 20}%`,
              width: "30%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
              pointerEvents: "none",
              borderRadius: "12px",
            }}
          />

          {/* 内側のマット - ダークグレー */}
          <div
            style={{
              background: "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)",
              padding: "32px",
              borderRadius: "4px",
              boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* 動画コンテンツエリア */}
            <div
              style={{
                width,
                height,
                background: "#000000",
                borderRadius: "2px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 画像分析の視覚化
const ImageAnalysisDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 画像のアップロードアニメーション
  const uploadSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const uploadScale = interpolate(uploadSpring, [0, 1], [0.8, 1]);
  const uploadOpacity = interpolate(uploadSpring, [0, 1], [0, 1]);

  // 分析結果の表示アニメーション
  const analysisSpring = spring({
    frame: frame - 1 * fps,
    fps,
    config: { damping: 200 },
  });

  const analysisY = interpolate(analysisSpring, [0, 1], [50, 0]);
  const analysisOpacity = interpolate(analysisSpring, [0, 1], [0, 1]);

  return (
    <div className="p-8 h-full flex flex-col">
      {/* ヘッダー */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">画像分析</h3>
        <p className="text-sm text-gray-500">AIが自動で旅行の写真を分析</p>
      </div>

      {/* 画像プレビュー */}
      <div
        style={{
          transform: `scale(${uploadScale})`,
          opacity: uploadOpacity,
        }}
        className="mb-6"
      >
        <div className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl aspect-video flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-24 h-24 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
      </div>

      {/* 分析結果 */}
      <div
        style={{
          transform: `translateY(${analysisY}px)`,
          opacity: analysisOpacity,
        }}
        className="space-y-3"
      >
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-blue-700">場所</span>
          </div>
          <p className="text-sm text-gray-700">東京タワー、東京都</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-purple-700">
              雰囲気
            </span>
          </div>
          <p className="text-sm text-gray-700">夜景、ロマンチック</p>
        </div>

        <div className="bg-pink-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-pink-700">人物</span>
          </div>
          <p className="text-sm text-gray-700">2人検出</p>
        </div>
      </div>
    </div>
  );
};

// 動画生成の視覚化
const VideoGenerationDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // プログレスバーのアニメーション
  const progressSpring = spring({
    frame,
    fps,
    durationInFrames: 2 * fps,
  });

  const progress = interpolate(progressSpring, [0, 1], [0, 100]);

  // 完了メッセージのアニメーション
  const completeSpring = spring({
    frame: frame - 2 * fps,
    fps,
    config: { damping: 200 },
  });

  const completeScale = interpolate(completeSpring, [0, 1], [0.8, 1]);
  const completeOpacity = interpolate(completeSpring, [0, 1], [0, 1]);

  return (
    <div className="p-8 h-full flex flex-col justify-center">
      {/* ヘッダー */}
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">動画生成中</h3>
        <p className="text-sm text-gray-500">Veo3でエモい動画を作成</p>
      </div>

      {/* 生成アニメーション */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl aspect-video flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-24 h-24 text-purple-600 animate-pulse"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
            />
          </svg>
        </div>

        {/* プログレスバー */}
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            style={{
              width: `${progress}%`,
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          {Math.round(progress)}%
        </p>
      </div>

      {/* 完了メッセージ */}
      <div
        style={{
          transform: `scale(${completeScale})`,
          opacity: completeOpacity,
        }}
        className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-16 h-16 text-green-500 mx-auto mb-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-xl font-bold text-green-700">動画生成完了！</p>
        <p className="text-sm text-gray-600 mt-2">エモいVlogが完成しました</p>
      </div>
    </div>
  );
};

export const FeatureDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // タイトルのアニメーション
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [-50, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // スマホフレームのエントランス
  const phoneSpring = spring({
    frame: frame - 0.3 * fps,
    fps,
    config: { damping: 200 },
  });

  const phoneScale = interpolate(phoneSpring, [0, 1], [0.9, 1]);
  const phoneOpacity = interpolate(phoneSpring, [0, 1], [0, 1]);

  // 動画再生のフェードイン
  const videoSpring = spring({
    frame: frame - 30 * fps,
    fps,
    config: { damping: 200 },
  });

  const videoOpacity = interpolate(videoSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
      <div
        className="w-full h-full flex items-center"
        style={{ padding: "0 8%" }}
      >
        {/* 左側: スマホフレーム */}
        <div
          style={{
            transform: `scale(${phoneScale})`,
            opacity: phoneOpacity,
            marginRight: "auto",
          }}
        >
          <PhoneFrame>
            {/* 画像分析デモ（最初の15秒） */}
            <Sequence durationInFrames={15 * fps}>
              <ImageAnalysisDemo />
            </Sequence>

            {/* 動画生成デモ（次の15秒） */}
            <Sequence from={15 * fps} durationInFrames={15 * fps}>
              <VideoGenerationDemo />
            </Sequence>

            {/* 実際のデモ動画を再生（30秒以降） */}
            <Sequence from={30 * fps}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: videoOpacity,
                  background: "#000000",
                }}
              >
                <OffthreadVideo
                  src={staticFile("demo.mov")}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </Sequence>
          </PhoneFrame>
        </div>

        {/* 右側: タイトルと機能説明 */}
        <div
          style={{
            flex: "1",
            maxWidth: "600px",
            marginLeft: "4rem",
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          {/* タイトル */}
          <h2
            className="font-bold text-white"
            style={{
              fontSize: "4rem",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              marginBottom: "0.5rem",
            }}
          >
            機能デモ
          </h2>
          <div
            style={{
              height: "4px",
              width: "120px",
              background: "linear-gradient(90deg, #3b82f6, #a855f7)",
              borderRadius: "2px",
              marginBottom: "3rem",
            }}
          />

          {/* 機能説明リスト */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* 1. 画像分析 */}
            <div
              style={{
                opacity: interpolate(
                  Math.max(0, frame - 2 * fps),
                  [0, 0.5 * fps],
                  [0, 1],
                  {
                    extrapolateRight: "clamp",
                  },
                ),
                transform: `translateX(${interpolate(
                  Math.max(0, frame - 2 * fps),
                  [0, 0.5 * fps],
                  [30, 0],
                  {
                    extrapolateRight: "clamp",
                  },
                )}px)`,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "white",
                    boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
                    flexShrink: 0,
                  }}
                >
                  1
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: "0.25rem",
                    }}
                  >
                    画像分析
                  </h3>
                  <p style={{ fontSize: "1.125rem", color: "#d1d5db" }}>
                    AIが旅行の写真を自動で分析
                  </p>
                </div>
              </div>
            </div>

            {/* 2. 動画生成 */}
            <div
              style={{
                opacity: interpolate(
                  Math.max(0, frame - 4 * fps),
                  [0, 0.5 * fps],
                  [0, 1],
                  {
                    extrapolateRight: "clamp",
                  },
                ),
                transform: `translateX(${interpolate(
                  Math.max(0, frame - 4 * fps),
                  [0, 0.5 * fps],
                  [30, 0],
                  {
                    extrapolateRight: "clamp",
                  },
                )}px)`,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "white",
                    boxShadow: "0 8px 24px rgba(168, 85, 247, 0.4)",
                    flexShrink: 0,
                  }}
                >
                  2
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: "0.25rem",
                    }}
                  >
                    動画生成
                  </h3>
                  <p style={{ fontSize: "1.125rem", color: "#d1d5db" }}>
                    Veo3でエモいVlogを自動作成
                  </p>
                </div>
              </div>
            </div>

            {/* 3. 完成 */}
            <div
              style={{
                opacity: interpolate(
                  Math.max(0, frame - 6 * fps),
                  [0, 0.5 * fps],
                  [0, 1],
                  {
                    extrapolateRight: "clamp",
                  },
                ),
                transform: `translateX(${interpolate(
                  Math.max(0, frame - 6 * fps),
                  [0, 0.5 * fps],
                  [30, 0],
                  {
                    extrapolateRight: "clamp",
                  },
                )}px)`,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "white",
                    boxShadow: "0 8px 24px rgba(236, 72, 153, 0.4)",
                    flexShrink: 0,
                  }}
                >
                  3
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: "0.25rem",
                    }}
                  >
                    完成
                  </h3>
                  <p style={{ fontSize: "1.125rem", color: "#d1d5db" }}>
                    思い出がプロ級の動画に
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
