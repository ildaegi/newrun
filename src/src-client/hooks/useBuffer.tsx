import { useCallback, useState } from "react";
import { arrayBufferToString } from "../helpers/arrayBufferToString.helper";

export function useBuffer() {
  const [file, setFile] = useState<File>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [buffer, setBuffer] = useState<string | ArrayBuffer | null>(null);
  const [textOriginalFile, setTextOriginalFile] = useState<
    string | ArrayBuffer | null
  >(null);

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.error("file reading was aborted");
      reader.onerror = () => console.error("file reading has failed");
      reader.onload = async () => {
        setFile(file);
        setFileName(file.name);
        setBuffer(reader.result);

        reader.result &&
          arrayBufferToString(reader.result, setTextOriginalFile);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const testFileUpload = () => {};

  const fileUpload = useCallback(() => {
    if (!file || !fileName) return;

    const formData = new FormData();
    formData.append("files", file, fileName);
    formData.append("name", fileName);

    return fetch("api/v1/gltf/upload", { method: "post", body: formData });
  }, [file, fileName]);

  return { buffer, onDrop, fileUpload, testFileUpload };
}
