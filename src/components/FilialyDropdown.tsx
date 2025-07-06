// src/components/FilialyDropdown.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";

// Убедитесь, что пути к изображениям верны
import img1 from "/public/image/1.jpg";
import img2 from "/public/image/2.jpg";
import img3 from "/public/image/3.jpg";

const slides = [
  {
    id: 1,
    src: img1,
    alt: "Филиал на Тепличной",
    title: "Филиал на Тепличной",
    description: "г. Сочи, Тепличная 18А<br />работаем круглосуточно",
  },
  {
    id: 2,
    src: img2,
    alt: "Филиал на Роз",
    title: "Филиал на Роз",
    description: "г. Сочи, ул. Роз 37<br />время работы с 09:00-20:00",
  },
  {
    id: 3,
    src: img3,
    alt: "Филиал на Волжской",
    title: "Филиал на Волжской",
    description: "г. Сочи, ул. Волжская 30<br />время работы с 09:00-20:00",
  },
];

export default function FilialyDropdown() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cellCount = slides.length;

  const handlePrev = () =>
    setSelectedIndex((prev) => (prev - 1 + cellCount) % cellCount);
  const handleNext = () => setSelectedIndex((prev) => (prev + 1) % cellCount);

  const getCellClass = (index: number) => {
    if (index === selectedIndex) return styles.isActive;
    if (index === (selectedIndex - 1 + cellCount) % cellCount)
      return styles.isPrev;
    if (index === (selectedIndex + 1) % cellCount) return styles.isNext;
    return styles.isHidden;
  };

  return (
    <div className={styles.filialyDropdownContent}>
      <div className={styles.filialyDescriptionColumn}>
        <h2 className={styles.filialyTitle}>Наши филиалы в Сочи</h2>
        <p className={styles.filialySubtitle}>
          Выберите удобную для вас клинику. Мы всегда рядом, чтобы помочь вашему
          питомцу.
        </p>
      </div>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselScene}>
          <div className={styles.carousel}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${styles.carouselCell} ${getCellClass(index)}`}
              >
                {/* ИСПРАВЛЕНИЕ: Добавляем пропс 'sizes' для высокого качества */}
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  layout="fill"
                  objectFit="cover"
                  sizes="330px"
                />
                <div className={styles.cardOverlay}></div>
                <div className={styles.cardContent}>
                  <h4>{slide.title}</h4>
                  <p
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                  ></p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handlePrev}
          className={styles.carouselPrev}
          aria-label="Предыдущий филиал"
        >
          <svg viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 18l-6-6 6-6"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className={styles.carouselNext}
          aria-label="Следующий филиал"
        >
          <svg viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 18l6-6-6-6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
