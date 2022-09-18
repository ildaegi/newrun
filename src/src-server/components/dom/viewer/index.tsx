import dynamic from "next/dynamic";
import { useScene } from "../../../hooks/useScene";
import { Loading } from "../loading";

const Viewer = dynamic(() => import("../../canvas/viewer"), {
  ssr: false,
  loading: Loading,
});

interface ViewerContainerProps {
  buffer: string | ArrayBuffer;
}
export function ViewerContainer({ buffer }: ViewerContainerProps) {
  const { scene } = useScene({ buffer });
  const isLoading = scene === undefined;

  return (
    <div style={{ height: "100%" }}>
      {isLoading ? <Loading /> : <Viewer scene={scene} />}
    </div>
  );
}
