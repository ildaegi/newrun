import { useEffect, useState } from "react";
import { Group } from "three";
import { generateScene } from "../helpers/generateScene.helper";

interface UseScene {
  buffer: string | ArrayBuffer;
  // config: Config;
}
export function useScene({ buffer }: UseScene) {
  const [isHasAnimations, setHasAnimations] = useState<boolean>();
  const [scene, setScene] = useState<Group>();

  useEffect(() => {
    (async () => {
      const { isHasAnimations, scene } = await generateScene({ buffer });
      setHasAnimations(isHasAnimations);
      setScene(scene);
    })();
  }, [buffer]);

  return { scene, isHasAnimations };
}
