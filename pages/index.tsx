import type { NextPage } from "next";
import { FileDrop } from "../src/components/dom/fileDrop";
import { ViewerContainer } from "../src/components/dom/viewer";
import { useBuffer } from "../src/hooks/useBuffer";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { buffer, onDrop, testFileUpload } = useBuffer();

  return (
    <div style={{ height: "100%" }}>
      {buffer ? (
        <ViewerContainer buffer={buffer} />
      ) : (
        <FileDrop onDrop={onDrop} testFileUpload={testFileUpload} />
      )}
    </div>
  );
};

export default Home;
