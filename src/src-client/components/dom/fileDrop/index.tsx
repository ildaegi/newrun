import { DropzoneOptions, useDropzone, Accept } from "react-dropzone";

interface FileDropProps extends Pick<DropzoneOptions, "onDrop"> {
  testFileUpload: () => void;
}
export function FileDrop({ onDrop }: FileDropProps) {
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: ".gltf, .glb" as unknown as Accept,
  });

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ cursor: "pointer" }} {...getRootProps()}>
        <input {...getInputProps()} />

        <p>모델링 파일 올리기</p>
        {fileRejections.length ? <p>.gltf, .glb 파일만 가능합니다.</p> : null}
      </div>
    </div>
  );
}
