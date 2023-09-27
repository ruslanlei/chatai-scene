import {FC, useCallback, useEffect, useRef} from "react";
import {useThree} from "react-three-fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import { Vector3 } from 'three';
import { useSpring } from "@react-spring/three";

const defaultPosition: [number, number, number] = [0, 0, 2];

export const Camera: FC = () => {
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  const [, set] = useSpring(() => ({
    position: defaultPosition,
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
    },
    onChange: ({ value: { position } } ) => {
      cameraRef.current.lookAt(new Vector3(0, 0, 0));
      cameraRef.current.position.set(...position);
    }
  }));
  useEffect(() => {
    camera.lookAt(new Vector3(0, 0, 0));
  }, [camera]);

  const onCameraEnd = useCallback(() => {
    set({ position: defaultPosition, from: { position: camera.position.toArray() } });
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
        onEnd={onCameraEnd}
      />
      <PerspectiveCamera
        makeDefault
        fov={40}
        position={defaultPosition}
      />
    </>
  )
}