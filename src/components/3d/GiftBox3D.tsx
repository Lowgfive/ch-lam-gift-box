import { useRef } from "react";
import { Mesh, BoxGeometry, MeshStandardMaterial } from "three";

interface GiftBox3DProps {
  filledSlots: (string | null)[];
}

const GiftBox3D = ({ filledSlots }: GiftBox3DProps) => {
  const boxRef = useRef<Mesh>(null);

  const boxWidth = 6;
  const boxDepth = 6;
  const boxHeight = 1.5;
  const wallThickness = 0.1;
  const dividerThickness = 0.08;

  // Colors
  const boxColor = "#8B5A2B"; // Warm brown
  const innerColor = "#D2B48C"; // Tan/cream
  const filledColor = "#4A7C59"; // Green for filled slots

  // Calculate slot positions (3x3 grid)
  const slotSize = (boxWidth - wallThickness * 2 - dividerThickness * 2) / 3;
  const getSlotPosition = (index: number): [number, number, number] => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const x = -boxWidth / 2 + wallThickness + slotSize / 2 + col * (slotSize + dividerThickness);
    const z = -boxDepth / 2 + wallThickness + slotSize / 2 + row * (slotSize + dividerThickness);
    return [x, 0.3, z];
  };

  return (
    <group>
      {/* Bottom of box */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[boxWidth, wallThickness, boxDepth]} />
        <meshStandardMaterial color={boxColor} />
      </mesh>

      {/* Front wall */}
      <mesh position={[0, boxHeight / 2, boxDepth / 2 - wallThickness / 2]} receiveShadow castShadow>
        <boxGeometry args={[boxWidth, boxHeight, wallThickness]} />
        <meshStandardMaterial color={boxColor} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, boxHeight / 2, -boxDepth / 2 + wallThickness / 2]} receiveShadow castShadow>
        <boxGeometry args={[boxWidth, boxHeight, wallThickness]} />
        <meshStandardMaterial color={boxColor} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-boxWidth / 2 + wallThickness / 2, boxHeight / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[wallThickness, boxHeight, boxDepth]} />
        <meshStandardMaterial color={boxColor} />
      </mesh>

      {/* Right wall */}
      <mesh position={[boxWidth / 2 - wallThickness / 2, boxHeight / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[wallThickness, boxHeight, boxDepth]} />
        <meshStandardMaterial color={boxColor} />
      </mesh>

      {/* Vertical dividers (2) */}
      {[1, 2].map((i) => {
        const x = -boxWidth / 2 + wallThickness + slotSize * i + dividerThickness * (i - 0.5);
        return (
          <mesh key={`v-div-${i}`} position={[x, boxHeight / 2 - 0.1, 0]} castShadow>
            <boxGeometry args={[dividerThickness, boxHeight - 0.2, boxDepth - wallThickness * 2]} />
            <meshStandardMaterial color={innerColor} />
          </mesh>
        );
      })}

      {/* Horizontal dividers (2) */}
      {[1, 2].map((i) => {
        const z = -boxDepth / 2 + wallThickness + slotSize * i + dividerThickness * (i - 0.5);
        return (
          <mesh key={`h-div-${i}`} position={[0, boxHeight / 2 - 0.1, z]} castShadow>
            <boxGeometry args={[boxWidth - wallThickness * 2, boxHeight - 0.2, dividerThickness]} />
            <meshStandardMaterial color={innerColor} />
          </mesh>
        );
      })}

      {/* Slot indicators - show filled slots */}
      {filledSlots.map((productId, index) => {
        if (!productId) return null;
        const [x, y, z] = getSlotPosition(index);
        return (
          <mesh key={`slot-${index}`} position={[x, y + 0.4, z]} castShadow>
            <boxGeometry args={[slotSize * 0.85, 0.8, slotSize * 0.85]} />
            <meshStandardMaterial color={filledColor} />
          </mesh>
        );
      })}
    </group>
  );
};

export default GiftBox3D;
