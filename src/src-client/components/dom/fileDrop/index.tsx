import { DropzoneOptions, useDropzone, Accept } from "react-dropzone";

interface FileDropProps extends Pick<DropzoneOptions, "onDrop"> {
  testFileUpload: () => void;
}
export function FileDrop({ onDrop, testFileUpload }: FileDropProps) {
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: ".gltf, .glb" as unknown as Accept,
    });

  return (
    <div
      style={{ display: "flex", height: "100%", flex: 1 }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>어 올려</p>
      ) : (
        <p>
          여기다가 파일 올리든가
          <button onClick={testFileUpload}>테스트 해보던가</button>
        </p>
      )}
      {fileRejections.length ? (
        <p>아니 .gltf 이나 .glb 만 가능하다니깐요</p>
      ) : null}
    </div>
  );
}
