import "./index.css";
import { Composition } from "remotion";

import { AgentTeamsVideo } from "./SlideShow";
import { VideoEdit, VideoEditSchema } from "./VideoEdit";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Go 1.26紹介用の縦型ショート動画 */}
      <Composition
        id="Go126Shorts"
        component={AgentTeamsVideo}
        durationInFrames={510}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* スライドショーのような動画（横型） */}
      <Composition
        id="AgentTeamsVideo"
        component={AgentTeamsVideo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* 既存動画の編集例 */}
      <Composition
        id="VideoEdit"
        component={VideoEdit}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
        schema={VideoEditSchema}
        defaultProps={{
          overlayText: "Remotionで編集",
        }}
      />
      {/* 既存動画の編集例（縦型） */}
      <Composition
        id="VideoEditVertical"
        component={VideoEdit}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        schema={VideoEditSchema}
        defaultProps={{
          overlayText: "Remotionで編集",
        }}
      />
    </>
  );
};
