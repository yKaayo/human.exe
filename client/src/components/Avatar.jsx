import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

export const Avatar = forwardRef((props, ref) => {
  const { scene } = useGLTF("/model/robo.glb");
  const { animations } = useGLTF("/model/animations.glb");

  const group = useRef();
  const { actions, mixer } = useAnimations(animations, group);

  const [currentAnimation, setCurrentAnimation] = useState(
    animations.find((a) => a.name === "Idle")?.name || animations[0]?.name
  );

  useEffect(() => {
    if (!actions || !currentAnimation) return;

    // Para todas as animações
    Object.values(actions).forEach((action) => action.stop());

    // Reproduz a animação atual
    const action = actions[currentAnimation];
    if (action) action.reset().fadeIn(0.5).play();

    return () => {
      if (action) action.fadeOut(0.5);
    };
  }, [currentAnimation, actions]);

  // Expõe playAnimation via ref
  useImperativeHandle(ref, () => ({
    playAnimation: (name) => setCurrentAnimation(name),
  }));

  // Atualiza mixer
  useFrame((_, delta) => {
    mixer?.update(delta);
  });

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={scene} />
    </group>
  );
});

useGLTF.preload("/model/robo.glb");
useGLTF.preload("/model/animations.glb");
