import {FC, useCallback, useEffect, useRef, useState} from "react";
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

  const [
    pauseSpring,
    setPauseSpring
  ] = useState(false)

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
    },
    pause: pauseSpring,
  }));
  useEffect(() => {
    camera.lookAt(new Vector3(0, 0, 0));
  }, [camera]);

  const onCameraStart = useCallback(() => {
    setPauseSpring(true);
  }, [setPauseSpring])

  const onCameraEnd = useCallback(() => {
    setPauseSpring(false);
    set({ position: defaultPosition, from: { position: camera.position.toArray() } });
  }, [camera, setPauseSpring]);

  return (
    <>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={1.4}
        maxPolarAngle={1.4}
        minAzimuthAngle={-1}
        maxAzimuthAngle={1}
        onStart={onCameraStart}
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