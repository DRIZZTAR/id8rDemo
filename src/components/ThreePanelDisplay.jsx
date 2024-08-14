import React, { useRef, useEffect, useState } from "react";
import {
  useGLTF,
  useAnimations,
  Image,
  Float,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

useTexture.preload("/textures/frosted.jpg");

export default function ThreePanelDisplay(props) {
  const group = useRef();
  const { nodes, animations } = useGLTF("/models/ThreePanelDisplay.glb");
  const { actions } = useAnimations(animations, group);

  const frostedTexture = useTexture("/textures/frosted.jpg");

  // Leva controls for Float properties
  const {
    speedBottomRight,
    rotationIntensityBottomRight,
    floatIntensityBottomRight,
    floatingRangeBottomRight,
    speedBottomLeft,
    rotationIntensityBottomLeft,
    floatIntensityBottomLeft,
    floatingRangeBottomLeft,
  } = useControls("Float Controls", {
    speedBottomRight: { value: 3, min: 0, max: 10 },
    rotationIntensityBottomRight: { value: 1, min: 0, max: 10 },
    floatIntensityBottomRight: { value: 1, min: 0, max: 10 },
    floatingRangeBottomRight: {
      value: [-0.1, 0.02],
      min: -1,
      max: 1,
      step: 0.01,
    },
    speedBottomLeft: { value: 8, min: 0, max: 10 },
    rotationIntensityBottomLeft: { value: 0.5, min: 0, max: 10 },
    floatIntensityBottomLeft: { value: 1, min: 0, max: 10 },
    floatingRangeBottomLeft: {
      value: [-0.1, 0.04],
      min: -1,
      max: 1,
      step: 0.01,
    },
  });

  // State for materials
  const [panelMaterial, setPanelMaterial] = useState(
    new THREE.MeshStandardMaterial({
      color: "white",
      map: frostedTexture,
      opacity: 1.0,
      metalness: 0.7,
      roughness: 0.3,
      roughnessMap: frostedTexture,
    })
  );
  const [bottomRightMaterial, setBottomRightMaterial] = useState(
    new THREE.MeshPhysicalMaterial({
      color: "white",
      opacity: 0.5,
      transmission: 0.9, // Adjust to make it more glass-like
      metalness: 0.1,
      roughness: 1.0,
      roughnessMap: frostedTexture,
      reflectivity: 0.9, // Adjust reflectivity
      specularColor: "#0000ff",
      specularIntensity: 4,
    })
  );
  const [bottomLeftMaterial, setBottomLeftMaterial] = useState(
    new THREE.MeshPhysicalMaterial({
      color: "white",
      opacity: 0.5,
      transmission: 0.9, // Adjust to make it more glass-like
      metalness: 0.1,
      roughness: 1.0,
      roughnessMap: frostedTexture,
      reflectivity: 0.7, // Adjust reflectivity
      specularColor: "#0000ff",
      specularIntensity: 4,
    })
  );

  useEffect(() => {
    if (animations.length > 0) {
      console.log("Animations found:", animations);
      // Play the first animation (or modify as needed)
      actions[animations[0].name]?.play();
    } else {
      console.log("No animations found");
    }
  }, [animations, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {/* Main Panel */}
        <mesh
          name="Ebene"
          castShadow
          receiveShadow
          geometry={nodes.Ebene.geometry}
          material={panelMaterial}
        />

        <Image
          url="/images/large.png"
          scale={[1.99, 1.325]}
          position={[-0.01, 0.225, 0.09]}
          radius={0.03}
          side={THREE.DoubleSide}
        />

        {/* bottom-right */}
        <Float
          speed={speedBottomRight}
          rotationIntensity={rotationIntensityBottomRight}
          floatIntensity={floatIntensityBottomRight}
          floatingRange={floatingRangeBottomRight}
        >
          <mesh
            name="Square_Image_Panel"
            castShadow
            receiveShadow
            geometry={nodes.Square_Image_Panel.geometry}
            material={bottomRightMaterial}
            position={[0.708, -0.79, 0.077]}
          >
            <Image
              url="/images/square.png"
              scale={[0.5, 0.5]}
              position={[0.0, 0.0, 0.03]} // Adjust position if needed
              radius={0.03}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>

        {/* bottom-left */}
        <Float
          speed={speedBottomLeft}
          rotationIntensity={rotationIntensityBottomLeft}
          floatIntensity={floatIntensityBottomLeft}
          floatingRange={floatingRangeBottomLeft}
        >
          <mesh
            name="Wide_Image_Panel"
            castShadow
            receiveShadow
            geometry={nodes.Wide_Image_Panel.geometry}
            material={bottomLeftMaterial}
            position={[-0.315, -0.79, 0.077]}
          >
            <Image
              url="/images/rectangle.png"
              scale={[1.3, 0.46]}
              position={[0.0, 0.0, 0.03]}
              radius={0.03}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      </group>
    </group>
  );
}

useGLTF.preload("/models/ThreePanelDisplay.glb");
