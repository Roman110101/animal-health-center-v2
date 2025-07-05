// src/components/Hologram/Hologram.tsx

// Эта директива ОБЯЗАТЕЛЬНА. 3D-графика может работать только в браузере.
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

// Это наш вращающийся куб. Мы вынесли его в отдельный компонент для чистоты.
const RotatingBox = () => {
  // useRef используется для получения прямого доступа к 3D-объекту (мешу)
  const meshRef = useRef<Mesh>(null!);

  // useFrame - это хук, который запускает код на каждом кадре анимации (60 раз в секунду)
  useFrame((state, delta) => {
    // Вращаем наш куб
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    // mesh - это объект в 3D пространстве. У него есть форма (geometry) и материал (material).
    <mesh ref={meshRef}>
      {/* Форма: куб размером 1x1x1 */}
      <boxGeometry args={[1, 1, 1]} />
      {/* Материал: стандартный материал, который реагирует на свет. Сделаем его "цифровым" зеленым */}
      <meshStandardMaterial color={"#00ff00"} />
    </mesh>
  );
};

// Это основной компонент, который мы будем вставлять на страницу
const Hologram = () => {
  return (
    // Canvas - это наш 3D-холст, на котором всё будет рисоваться
    <Canvas>
      {/* Добавляем базовый свет, чтобы было хоть что-то видно */}
      <ambientLight intensity={0.2} />
      {/* Добавляем направленный свет, как от фонарика, чтобы были видны грани куба */}
      <directionalLight position={[2, 2, 2]} intensity={1} />

      {/* Размещаем наш вращающийся куб на сцене */}
      <RotatingBox />
    </Canvas>
  );
};

export default Hologram;
