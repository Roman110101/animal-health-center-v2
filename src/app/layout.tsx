// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Animal Health Center",
  description: "Премиальный сайт ветеринарной клиники",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
