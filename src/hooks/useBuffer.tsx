import { useState } from "react";
import { arrayBufferToString } from "../helpers/arrayBufferToString.helper";

export function useBuffer() {
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
        setFileName(file.name);
        setBuffer(reader.result);

        reader.result &&
          arrayBufferToString(reader.result, setTextOriginalFile);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const testFileUpload = () => {};

  return { buffer, onDrop, testFileUpload };
}
