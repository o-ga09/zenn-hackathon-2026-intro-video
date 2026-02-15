import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ロゴのアニメーション
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.8, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // キャッチフレーズのアニメーション
  const catchphraseSpring = spring({
    frame: frame - 0.5 * fps,
    fps,
    config: { damping: 200 },
  });

  const catchphraseY = interpolate(catchphraseSpring, [0, 1], [30, 0]);
  const catchphraseOpacity = interpolate(catchphraseSpring, [0, 1], [0, 1]);

  // CTAボタンのアニメーション
  const ctaSpring = spring({
    frame: frame - 1 * fps,
    fps,
    config: { damping: 200 },
  });

  const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1]);
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1]);

  // ボタンのパルスアニメーション
  const pulseScale = interpolate(
    Math.max(0, frame - 1.5 * fps),
    [0, 30, 60],
    [1, 1.05, 1],
    {
      extrapolateRight: "wrap",
    },
  );

  // フィーチャーリストのアニメーション
  const featuresSpring = spring({
    frame: frame - 1.5 * fps,
    fps,
    config: { damping: 200 },
  });

  const featuresY = interpolate(featuresSpring, [0, 1], [30, 0]);
  const featuresOpacity = interpolate(featuresSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-16">
      {/* メインロゴとタイトル */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
        className="text-center mb-12"
      >
        {/* カメラアイコン */}
        <div className="bg-white rounded-full p-6 shadow-2xl inline-block mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-20 h-20 text-purple-600"
          >
            <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
            <path
              fillRule="evenodd"
              d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-6xl font-bold text-white mb-4">Tavinikkiy Agent</h1>
      </div>

      {/* キャッチフレーズ */}
      <div
        style={{
          transform: `translateY(${catchphraseY}px)`,
          opacity: catchphraseOpacity,
        }}
        className="text-center mb-8"
      >
        <p className="text-3xl text-white font-medium drop-shadow-lg">
          旅行の振り返りを AI で、
        </p>
        <p className="text-3xl text-white font-medium drop-shadow-lg">
          簡単に、便利に、そして、もっとエモく
        </p>
      </div>

      {/* フィーチャーリスト */}
      <div
        style={{
          transform: `translateY(${featuresY}px)`,
          opacity: featuresOpacity,
        }}
        className="flex gap-8 mb-12"
      >
        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white font-semibold">クラウド保存</span>
        </div>

        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white font-semibold">AI自動生成</span>
        </div>

        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white font-semibold">スマホで完結</span>
        </div>
      </div>

      {/* CTAボタン */}
      <div
        style={{
          transform: `scale(${ctaScale * pulseScale})`,
          opacity: ctaOpacity,
        }}
      >
        <button className="bg-white text-purple-600 px-12 py-6 rounded-full text-2xl font-bold shadow-2xl">
          今すぐ始める
        </button>
      </div>

      {/* フッター */}
      <div
        style={{
          opacity: interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
        className="absolute bottom-16 text-center"
      >
        <p className="text-white/80 text-lg">
          あなたの旅行の思い出を、AIがエモい動画に変えます
        </p>
      </div>
    </AbsoluteFill>
  );
};
