import { WebGLRenderer, REVISION } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const THREE_PATH = `https://unpkg.zcom/three@0.${REVISION}.x`;
const dracoloader = new DRACOLoader().setDecoderPath(
  `${THREE_PATH}/examples/js/libs/draco/gltf/`
);
const ktx2Loader = new KTX2Loader().setTranscoderPath(
  `${THREE_PATH}/examples/js/libs/basis/`
);

export const gltfLoader =
  typeof window !== "undefined"
    ? new GLTFLoader()
        .setCrossOrigin("anonymous")
        .setDRACOLoader(dracoloader)
        .setKTX2Loader(ktx2Loader.detectSupport(new WebGLRenderer()))
        .setMeshoptDecoder(MeshoptDecoder)
    : undefined;
