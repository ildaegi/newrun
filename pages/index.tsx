import type { NextPage } from "next";
import { FileDrop } from "../src/src-server/components/dom/fileDrop";
import { ViewerContainer } from "../src/src-server/components/dom/viewer";
import { useBuffer } from "../src/src-server/hooks/useBuffer";

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
