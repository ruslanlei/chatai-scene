import {a, easings, useSpring} from "@react-spring/three";
import {PropsWithChildren} from "react";

export const FloatingAnimation = ({
  children,
  objectScale = 1,
  animationDuration = 2000,
  play = true,
}: PropsWithChildren<{ objectScale?: number, animationDuration?: number, play?: boolean }>) => {
  const { position } = useSpring({
    from: {
      position: [0, 0, 0],
    },
    to: async (next) => {
      while (1) { // infinite loop
        await next({
          position: [0, 0.02 * objectScale, 0],
        });
        await next({
          position: [0, -0.02 * objectScale, 0],
        });
      }
    },
    pause: !play,
    config: {
      duration: animationDuration,
      easing: easings.easeInOutQuad,
    },
  });

  const { rotation } = useSpring({
    from: {
      rotation: [0, 0, 0],
    },
    to: async (next) => {
      while (1) {
        await next({
          rotation: [Math.PI * -0.01, 0, 0.01],
        });
        await next({
          rotation: [Math.PI * 0.01, 0, -0.003],
        });
      }
    },
    pause: !play,
    config: {
      duration: animationDuration * 0.8,
      easing: easings.easeInOutQuad,
    },
  });

  return (
    <a.mesh position={position} rotation={rotation}>
      {children}
    </a.mesh>
  );
};