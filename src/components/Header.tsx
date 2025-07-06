// src/components/Header.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
// ИСПРАВЛЕНО: Убран лишний слэш в пути
import logo from "/public/logo/logo.svg";
import FilialyDropdown from "./FilialyDropdown";

// --- ЕДИНЫЙ ИСТОЧНИК ПРАВДЫ ДЛЯ МЕНЮ ---
const navConfig = {
  links: [
    { id: "filialy", title: "ФИЛИАЛЫ", hasDropdown: true },
    { id: "uslugi", title: "УСЛУГИ", hasDropdown: true },
    { id: "novosti", title: "НОВОСТИ", hasDropdown: true },
    { id: "price-list", title: "ПРАЙС-ЛИСТ", hasDropdown: true },
    { id: "photo", title: "ФОТО", hasDropdown: false },
    { id: "contacts", title: "КОНТАКТЫ", hasDropdown: false },
  ],
  content: {
    uslugi: [
      {
        title: "Основные направления",
        links: [
          "ТЕРАПИЯ",
          "ХИРУРГИЯ",
          "ДЕРМАТОЛОГИЯ",
          "СТАЦИОНАР",
          "ПРИЕМ И КОНСУЛЬТАЦИЯ",
        ],
      },
      {
        title: "Специализированные услуги",
        links: [
          "ЭНДОСКОПИЯ",
          "РЕАБИЛИТАЦИЯ",
          "ОНЛАЙН КОНСУЛЬТАЦИЯ",
          "СТОМАТОЛОГИЯ",
          "НЕЙРОХИРУРГИЯ",
        ],
      },
    ],
    novosti: [{ title: "Разделы", links: ["АКЦИИ", "СТАТЬИ"] }],
    "price-list": [
      {
        title: "Общее",
        links: [
          "ОБЩИЙ ПРАЙС НА ВСЕ УСЛУГИ",
          "ВЫЗОВ",
          "КИСЛОРОД",
          "КРЕМАЦИЯ",
          "ЛОШАДИ",
          "УСЛУГИ",
          "ЧИПИРОВАНИЕ",
        ],
      },
      {
        title: "Специалисты",
        links: [
          "ДЕРМАТОЛОГИЯ",
          "ДИЕТОЛОГИЯ",
          "ЗООПСИХОЛОГИЯ",
          "НЕВРОЛОГИЯ",
          "НЕЙРОХИРУРГИЯ",
          "НЕФРОЛОГИЯ",
          "ОНКОЛОГИЯ",
          "ОФТАЛЬМОЛОГИЯ",
          "ПРИЕМ КАРДИОЛОГА",
          "СТОМАТОЛОГИЯ",
          "ТРАВМАТОЛОГИЯ",
          "ГАСТРОЭНТЕРОЛОГ",
          "ЭНДОКРИНОЛОГИЯ",
        ],
      },
      {
        title: "Диагностика и процедуры",
        links: [
          "ОНЛАЙН КОНСУЛЬТАЦИЯ",
          "ПЕРЕЛИВАНИЕ КРОВИ",
          "РЕНТГЕН",
          "СТАЦИОНАР",
          "ТИТРЫ АНТИТЕЛ",
          "УЗИ",
          "ЭНДОСКОПИЯ",
        ],
      },
    ],
  },
};
// ------------------------------------------

type MenuKey = keyof typeof navConfig.content | "filialy";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [dropdownHeight, setDropdownHeight] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const contentRefs = useRef<Record<MenuKey, HTMLDivElement | null>>({
    uslugi: null,
    novosti: null,
    "price-list": null,
    filialy: null,
  });

  useEffect(() => {
    if (activeMenu) {
      const contentElement = contentRefs.current[activeMenu as MenuKey];
      if (contentElement) {
        setDropdownHeight(contentElement.offsetHeight + 80);
      }
      document.body.classList.add("menu-active");
    } else {
      document.body.classList.remove("menu-active");
    }
    return () => {
      document.body.classList.remove("menu-active");
    };
  }, [activeMenu]);

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  };

  return (
    <header
      className={`${styles.header} ${activeMenu ? styles.dropdownActive : ""}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.inner}>
        <div className={styles.logo}>
          <a href="#">
            <Image src={logo} alt="Логотип" width={24} height={24} />
          </a>
        </div>
        <nav className={styles.nav}>
          <ul>
            {navConfig.links.map((link) => (
              <li
                key={link.id}
                className={`${styles.navItem} ${
                  activeMenu === link.id ? styles.isCurrent : ""
                }`}
                onMouseEnter={() =>
                  link.hasDropdown && handleMouseEnter(link.id)
                }
              >
                <a href="#" className={styles.navLink}>
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.iconPlaceholder}></div>
      </div>

      <div
        className={styles.dropdownContainer}
        onMouseEnter={() =>
          timeoutRef.current && clearTimeout(timeoutRef.current)
        }
      >
        <div
          className={styles.dropdownBackground}
          style={{
            height: activeMenu && dropdownHeight ? `${dropdownHeight}px` : 0,
          }}
        />
        <div className={styles.dropdownContentWrapper}>
          {/* РЕНДЕРИМ ВСЕ МЕНЮ ДИНАМИЧЕСКИ */}
          {(
            Object.keys(navConfig.content) as Array<
              keyof typeof navConfig.content
            >
          ).map((menuKey) => (
            <div
              key={menuKey}
              // ИСПРАВЛЕНО: Правильный синтаксис ref и правильный ключ `menuKey`
              ref={(el) => {
                contentRefs.current[menuKey] = el;
              }}
              className={`${styles.dropdownContent} ${
                activeMenu === menuKey ? styles.active : ""
              }`}
            >
              {navConfig.content[menuKey].map((column: any, index: number) => (
                <div key={index} className={styles.dropdownColumn}>
                  <h4 className={styles.columnTitle}>{column.title}</h4>
                  <ul className={styles.columnLinks}>
                    {column.links.map((link: string, linkIndex: number) => (
                      <li key={linkIndex}>
                        <a href="#">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          {/* ОТДЕЛЬНО РЕНДЕРИМ КОМПОНЕНТ ДЛЯ ФИЛИАЛОВ */}
          <div
            // ИСПРАВЛЕНО: Правильный синтаксис ref
            ref={(el) => {
              contentRefs.current["filialy"] = el;
            }}
            className={`${styles.dropdownContent} ${
              activeMenu === "filialy" ? styles.active : ""
            }`}
          >
            <FilialyDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
