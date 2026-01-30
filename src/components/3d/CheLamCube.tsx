import { useRef, useState } from "react";
import { useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { Mesh, Vector3, Plane } from "three";
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
  const dragPlane = useRef(new Plane(new Vector3(0, 1, 0), 0));
  const dragTarget = useRef<Vector3 | null>(null);
  const { gl } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // When dragging, follow the pointer target smoothly
      if (localDragging && dragTarget.current) {
        meshRef.current.position.lerp(dragTarget.current, 0.45);
      } else if (!isDragging) {
        // Return to original position with floating animation
        const targetPos = new Vector3(
          position[0],
          position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05,
          position[2]
        );
        meshRef.current.position.lerp(targetPos, 0.1);
        meshRef.current.rotation.y += 0.005;
      }
      
      // Scale effect on hover or drag
      const targetScale = (hovered || localDragging) ? 1.15 : 1;
      meshRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setLocalDragging(true);
    onDragStart?.(productId);

    // Lock drag plane at the cube's current height to avoid vertical jitter
    if (meshRef.current) {
      const y = meshRef.current.position.y;
      dragPlane.current.set(new Vector3(0, 1, 0), -y);
    }

    const point = new Vector3();
    e.ray.intersectPlane(dragPlane.current, point);
    dragTarget.current = point;

    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    gl.domElement.style.cursor = "grabbing";
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (localDragging && meshRef.current) {
      setLocalDragging(false);
      onDragEnd?.(productId, meshRef.current.position.clone());
      dragTarget.current = null;
      gl.domElement.style.cursor = "auto";
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (localDragging) {
      e.stopPropagation();

      const point = new Vector3();
      e.ray.intersectPlane(dragPlane.current, point);
      dragTarget.current = point;
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          gl.domElement.style.cursor = "grab";
        }}
        onPointerOut={(e) => {
          setHovered(false);
          if (!localDragging) gl.domElement.style.cursor = "auto";
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        castShadow
      >
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.1}
          emissive={hovered || localDragging ? color : "#000000"}
          emissiveIntensity={hovered || localDragging ? 0.3 : 0}
        />
      </mesh>
      {!localDragging && (
        <Text
          position={[position[0], position[1] + 0.7, position[2]]}
          fontSize={0.18}
          color="#4A3728"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
          fontWeight="bold"
        >
          {name}
        </Text>
      )}
    </group>
  );
};

export default CheLamCube;
