import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./ThemeSwitcher.module.scss";
import { useTheme } from "app/providers/ThemeProvider";
import DarkIcon from "shared/assets/icons/theme-dark.svg";
import LightIcon from "shared/assets/icons/theme-light.svg";
import { Theme } from "app/providers/ThemeProvider/lib/ThemeContext";
import { Button, ThemeButton } from "shared/ui/Button/Button";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      theme={ThemeButton.CLEAR}
      onClick={toggleTheme}
      className={classNames(styles.themeSwitcher, {}, [className])}
    >
      {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
};
