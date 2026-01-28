import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { Text } from "@react-three/drei";

interface CheLamCubeProps {
  position: [number, number, number];
  color: string;
  name: string;
  productId: string;
  onDragStart?: (productId: string) => void;
  onDragEnd?: (productId: string, position: Vector3) => void;
  isDragging?: boolean;
}

const CheLamCube = ({
  position,
  color,
  name,
  productId,
  onDragStart,
  onDragEnd,
  isDragging = false,
}: CheLamCubeProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [localDragging, setLocalDragging] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation when not dragging
      if (!localDragging && !isDragging) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
        meshRef.current.rotation.y += 0.005;
      }
      
      // Scale effect on hover
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setLocalDragging(true);
    onDragStart?.(productId);
    document.body.style.cursor = "grabbing";
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (localDragging && meshRef.current) {
      setLocalDragging(false);
      onDragEnd?.(productId, meshRef.current.position);
      document.body.style.cursor = "auto";
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          setHovered(false);
          if (!localDragging) document.body.style.cursor = "auto";
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        castShadow
      >
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.1}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>
      <Text
        position={[position[0], position[1] - 0.8, position[2]]}
        fontSize={0.2}
        color="#4A3728"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.5}
      >
        {name}
      </Text>
    </group>
  );
};

export default CheLamCube;
