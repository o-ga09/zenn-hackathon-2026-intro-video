# Zenn Hackathon 2026 - Intro Video

Remotionを使用した動画編集プロジェクト

## 📝 概要

このプロジェクトは、Remotionを使って既存の動画（`IMG_2350.MOV`）を編集し、以下の要素を追加します：

- 画面下部1/3にキービジュアル（`keyvisual.png`）を配置して観客を隠す
- 1440フレームから回転アニメーション付きの字幕を表示
- テキストオーバーレイとエフェクト

## 🚀 セットアップ

### 依存関係のインストール

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm run dev
```

ブラウザが開き、Remotion Studioが起動します。

## 🎬 コンポジション

プロジェクトには以下のコンポジションが含まれています：

### VideoEdit
既存動画を編集するメインのコンポジション

- **サイズ**: 1920x1080
- **FPS**: 30
- **長さ**: 300フレーム（10秒）
- **特徴**:
  - 動画の6100〜8100フレーム区間を使用
  - 画面下部にキービジュアルをオーバーレイ
  - 1440フレームから「山本彩武道館LIVE 2026.7.14 Thu 開催決定！！！」の字幕が回転アニメーション付きで表示

### Shorts
YouTubeショート風の動画

- **サイズ**: 1920x1080
- **FPS**: 30
- **長さ**: 150フレーム（5秒）

### Go126Shorts / AgentTeamsVideo
その他のサンプルコンポジション

## 📂 ファイル構成

```
public/
  ├── IMG_2350.MOV       # 元動画
  ├── keyvisual.png      # オーバーレイ用画像
  ├── happy.png
  ├── shining_star.mp3
  └── wonderland.wav
src/
  ├── VideoEdit.tsx      # メイン編集コンポーネント
  ├── Shorts.tsx
  ├── SlideShow.tsx
  └── Root.tsx           # コンポジション定義
```

## 🎨 編集内容のカスタマイズ

### 字幕の表示タイミングを変更

[VideoEdit.tsx](src/VideoEdit.tsx)の`<Sequence from={1440}>`の数値を変更

### キービジュアルの高さを調整

[VideoEdit.tsx](src/VideoEdit.tsx)の`height: "33.33%"`を変更

### テキストの内容を変更

Remotion Studioの右パネルから`overlayText`プロパティを編集

## 📹 動画の出力

```bash
npx remotion render VideoEdit output.mp4
```

特定の設定で出力：

```bash
npx remotion render VideoEdit output.mp4 --codec=h264 --height=1080 --width=1920
```

## 🔧 その他のコマンド

**Remotionのアップグレード**

```bash
npx remotion upgrade
```

**Lint実行**

```bash
pnpm run lint
```

## 📚 ドキュメント

- [Remotion公式ドキュメント](https://www.remotion.dev/docs)
- [Remotion Discord](https://discord.gg/6VzzNDwUwV)

## 📄 ライセンス

UNLICENSED (Private Project)

