import type { Metadata } from "next";
// 1. Импортируем наши глобальные стили
import "./globals.css";
// 2. Импортируем наш новый компонент Header.
//    '@/' - это волшебный короткий путь к папке 'src'
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Центр Здоровья Животных",
  description: "Создано с помощью Next.js и магии ;)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        {/* 3. Вот здесь мы говорим: "Сначала всегда рисуй шапку" */}
        <Header />
        {/* А потом - содержимое текущей страницы */}
        <main>{children}</main>
      </body>
    </html>
  );
}