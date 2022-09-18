import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import type { OrbitControls as OrbitControlsRef } from "three-stdlib";
import { Group } from "three";

interface ViewerProps {
  scene: Group;
}
export default function Viewer({ scene }: ViewerProps) {
  const ref = useRef<OrbitControlsRef>(null);
  //
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 150], fov: 50 }}
    >
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Stage
          // @ts-ignore
          controls={ref}
          shadows
          adjustCamera
          // preset={preset as "rembrandt" | "portrait" | "upfront" | "soft"}
          // intensity={intensity}
          // contactShadow={
          //   contactShadow
          //     ? { blur: 2, opacity: 0.5, position: [0, 0, 0] }
          //     : contactShadow
          // }
          // environment={environment as PresetsType}
        >
          <primitive object={scene} />
        </Stage>
      </Suspense>
      <OrbitControls
        ref={ref}
        // autoRotate={autoRotate}
      />
    </Canvas>
  );
}
