import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import {
  Button,
  ButtonSize,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { t } from 'i18next'
import {
  AppLink,
  AppLinkTheme,
} from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import AboutIcon from 'shared/assets/icons/about-us.svg'
import HomeIcon from 'shared/assets/icons/home.svg'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const onToggle = () => {
    setIsCollapsed((prev) => !prev)
  }

  return (
    <div
      className={classNames(
        styles.sidebar,
        {
          [styles.collapsed]: isCollapsed,
        },
        [className]
      )}
      data-testid='sidebar'
    >
      <Button
        data-testid='sidebar-toggle'
        theme={ButtonTheme.BACKGROUND_INVERTED}
        className={styles.collapsedBtn}
        onClick={onToggle}
        square
        size={ButtonSize.L}
      >
        {isCollapsed ? '>' : '<'}
      </Button>
      <div className={styles.items}>
        <AppLink
          theme={AppLinkTheme.INVERTED}
          to={RoutePath.home}
          className={styles.item}
        >
          <HomeIcon className={styles.icon} />
          <span className={styles.link}>{t('Home')}</span>
        </AppLink>

        <AppLink
          theme={AppLinkTheme.INVERTED}
          to={RoutePath.about}
          className={styles.item}
        >
          <AboutIcon className={styles.icon} />
          <span className={styles.link}>
            {t('About us')}
          </span>
        </AppLink>
      </div>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher
          short={isCollapsed}
          className={styles.lang}
        />
      </div>
    </div>
  )
}
