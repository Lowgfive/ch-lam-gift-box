import { Suspense, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import { Vector3 } from "three";
import GiftBox3D from "./GiftBox3D";
import CheLamCube from "./CheLamCube";
import { Product } from "@/data/mockData";

interface Scene3DProps {
  products: Product[];
  boxItems: (string | null)[];
  onAddItem: (productId: string) => void;
  selectedCount: number;
  maxItems: number;
}

const productColors: Record<string, string> = {
  "1": "#C4A574", // Traditional - warm beige
  "2": "#7B9E6B", // Matcha - green
  "3": "#6B4423", // Cacao - brown
  "4": "#E8B86D", // Ginger - golden
  "5": "#8FBC8B", // Pandan - light green
  "6": "#F5F5DC", // Coconut - cream
  "7": "#3D3D3D", // Sesame - dark
  "8": "#D2691E", // Peanut - brown
};

const Scene3D = ({ products, boxItems, onAddItem, selectedCount, maxItems }: Scene3DProps) => {
  const [draggedProduct, setDraggedProduct] = useState<string | null>(null);

  const handleDragStart = useCallback((productId: string) => {
    setDraggedProduct(productId);
  }, []);

  const handleDragEnd = useCallback((productId: string, position: Vector3) => {
    // Check if dropped near the box (simple distance check)
    if (position.x > -4 && position.x < 4 && position.z > -4 && position.z < 4 && position.y < 3) {
      if (selectedCount < maxItems) {
        onAddItem(productId);
      }
    }
    setDraggedProduct(null);
  }, [onAddItem, selectedCount, maxItems]);

  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-b from-cream to-background">
      <Canvas
        shadows
        camera={{ position: [8, 8, 8], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-primary font-medium">Đang tải...</div>
          </Html>
        }>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-10, 5, -10]} intensity={0.5} />

          {/* Gift Box */}
          <group position={[0, 0, 0]}>
            <GiftBox3D filledSlots={boxItems} />
          </group>

          {/* Chè Lam Cubes - arranged on the right side in 2 columns */}
          <group position={[5, 0, 0]}>
            {products.map((product, index) => {
              const col = index % 2;
              const row = Math.floor(index / 2);
              return (
                <CheLamCube
                  key={product.id}
                  position={[col * 1.8, 1.5, -3 + row * 1.6]}
                  color={productColors[product.id] || "#C4A574"}
                  name={product.nameVi}
                  productId={product.id}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  isDragging={draggedProduct === product.id}
                />
              );
            })}
          </group>

          {/* Floor shadow */}
          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={10}
          />

          {/* Environment for nice reflections */}
          <Environment preset="apartment" />

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            minDistance={8}
            maxDistance={20}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate={!draggedProduct}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
