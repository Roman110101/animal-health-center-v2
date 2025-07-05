// src/app/page.tsx

import Header from "@/components/Header/Header";
// 1. Импортируем наш новый 3D-компонент
import Hologram from "@/components/Hologram/Hologram";

export default function Home() {
  return (
    <main>
      <Header />
      {/* 2. Пока что просто размещаем его здесь */}
      <Hologram />
    </main>
  );
}
