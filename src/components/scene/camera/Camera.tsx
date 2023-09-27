import {FC, useEffect} from "react";
import {useThree} from "react-three-fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import { Vector3 } from 'three';

export const Camera: FC = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(new Vector3(0, 0, 0));
  }, [camera]);

  return (
    <>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={1.4}
        maxPolarAngle={1.4}
        minAzimuthAngle={-1}
        maxAzimuthAngle={1}
      />
      <PerspectiveCamera
        makeDefault
        fov={40}
        position={[0, 0, 2]}
      />
    </>
  )
}