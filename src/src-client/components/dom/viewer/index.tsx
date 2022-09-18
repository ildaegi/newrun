import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useScene } from "../../../hooks/useScene";
import { Loading } from "../loading";

const Viewer = dynamic(() => import("../../canvas/viewer"), {
  ssr: false,
  loading: Loading,
});

interface ViewerContainerProps {
  buffer: string | ArrayBuffer;
  fileUpload: () => Promise<Response>;
  reset: () => void;
}
export function ViewerContainer({
  buffer,
  fileUpload,
  reset,
}: ViewerContainerProps) {
  const { scene } = useScene({ buffer });
  const isLoading = scene === undefined;

  const [uploaded, setUploaded] = useState<null | undefined | true>(null);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={async () => {
          if (uploaded) {
            reset();
          } else if (uploaded === null) {
            try {
              setUploaded(undefined);
              const res = await fileUpload();
              setUploaded(res ? true : null);
            } catch (error) {
              setUploaded(null);
            }
          }
        }}
        style={{
          zIndex: 100,
          cursor: uploaded === true && uploaded === null ? "pointer" : "auto",
          color: "#333",
          position: "absolute",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#c4c4c4",
          border: "1px #eaeaea solid",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "25px",
        }}
      >
        {uploaded === null
          ? "업로드"
          : uploaded === undefined
          ? "업로드중..."
          : "완료"}
      </div>
      {isLoading ? <Loading /> : <Viewer scene={scene} />}
    </div>
  );
}
