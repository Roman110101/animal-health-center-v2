// Этот компонент пока не интерактивный, но "use client" на будущее не повредит.
"use client";

import React from 'react';
// Импортируем наши модульные стили.
import styles from './Header.module.css';

// Создаем массив с нашими ссылками. Так удобнее управлять ими.
const navItems = [
  { title: 'Филиалы', href: '#' },
  { title: 'Услуги', href: '#' },
  { title: 'Новости', href: '#' },
  { title: 'Прайс-лист', href: '#' },
  { title: 'Фото', href: '#' },
  { title: 'Контакты', href: '#' },
];

const Header = () => {
  return (
    <header className={styles.appleHeader}>
      <nav>
        <ul className={styles.navList}>
          {/* Пробегаемся по массиву и создаем каждую ссылку */}
          {navItems.map((item) => (
            <li key={item.title}>
              <a href={item.href} className={styles.navLink}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;