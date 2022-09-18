import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { gltfLoader } from "./gltfLoader.helper";

interface GenerateSceneProps {
  // fileName: string;
  buffer: string | ArrayBuffer;
}
export async function generateScene({ buffer }: GenerateSceneProps) {
  const result = await new Promise<GLTF>(
    (resolve, reject) =>
      gltfLoader && gltfLoader.parse(buffer, "", resolve, reject)
  );

  return {
    isHasAnimations: Boolean(result.animations.length),
    scene: result.scene,
  };
}
