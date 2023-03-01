import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import styles from "./Navbar.module.scss";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(styles.navbar, {}, [className])}>
      <ThemeSwitcher />
      <div className={styles.links}>
        <AppLink
          theme={AppLinkTheme.INVERTED}
          to={"/"}
          className={styles.homeAppLink}
        >
          Home
        </AppLink>
        <AppLink theme={AppLinkTheme.INVERTED} to={"/about"}>
          About
        </AppLink>
      </div>
    </div>
  );
};
