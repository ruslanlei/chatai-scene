import { FC } from "react";
import { Canvas } from 'react-three-fiber';
import { a, easings, useSpring } from '@react-spring/three';
import {useGLTF} from "@react-three/drei";
import chatGptModel from '../../assets/models/chatgpt.gltf?url';
import {FloatingAnimation} from "./floatingAnimation/FloationAnimation.tsx";
import {Camera} from "./camera/Camera.tsx";

const ChatGPTLogo: FC = () => {
  const gltf = useGLTF(chatGptModel);

  const logoMesh = gltf.scene.children[0]

  const {
    position: scenePosition,
  } = useSpring({
    position: [0, 0, 0],
    from: { position: [0, 1, 0] },
    config: { mass: 1, tension: 170, friction: 12 },
  });

  const {
    scale: logoScale,
  } = useSpring({
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    from: {
      scale: [0, 0, 0],
      rotation: [0, 0, Math.PI * 4],
    },
    config: { mass: 1, tension: 170, friction: 12 },
  });

  const {
    rotation: logoRotation,
  } = useSpring({
    rotation: [0, 0, 0],
    from: {
      rotation: [0, 0, -Math.PI],
    },
    config: { easing: easings.easeOutBack },
    delay: 140,
  });

  return (
    <FloatingAnimation play={true}>
      <a.group position={scenePosition}>
        <a.primitive object={logoMesh} scale={logoScale} rotation={logoRotation} />

        {gltf.scene.children.slice(1).map((child, index) => (
          <primitive key={index} object={child} />
        ))}
      </a.group>
    </FloatingAnimation>
  );
}

export const Scene: FC = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <Camera />
      <pointLight intensity={10} position={[1, 0.5, 1]} />
      <pointLight intensity={5} position={[-1, -1, 1]} />
      <ChatGPTLogo />
    </Canvas>
  );
}