import React, { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Sidebar.module.scss";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { LangSwitcher } from "widgets/LangSwitcher";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const onToggle = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  return (
    <div
      className={classNames(
        styles.sidebar,
        {
          [styles.collapsed]: collapsed,
        },
        [className]
      )}
    >
      <button onClick={onToggle}>Toggle</button>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={styles.lang} />
      </div>
    </div>
  );
};
