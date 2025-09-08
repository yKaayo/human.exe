import { ContactShadows, Environment, Text } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useChat } from "../contexts/useChat";
import { Avatar } from "./Avatar";

const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => {
          if (loadingText.length > 2) {
            return ".";
          }
          return loadingText + ".";
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

export const Experience = () => {
  const [_, setAvatarControls] = useState(null);

  return (
    <>
      <Environment preset="sunset" />
      <Suspense>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense>

      <Avatar
        rotation={[0, -Math.PI / 2, 0.5]}
        position={[0, -0.25, 0]}
        onAnimationReady={setAvatarControls}
      />

      <ContactShadows
        opacity={0.7}
        position={[0, -1.5, 0]}
        width={10}
        height={10}
      />
    </>
  );
};
