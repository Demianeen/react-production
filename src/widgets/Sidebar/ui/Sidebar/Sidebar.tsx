import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ThemeButton,
} from 'shared/ui/Button/Button'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { t } = useTranslation()
  const [isCollapsed, setIsCollapsed] = useState(true)

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
    >
      <Button theme={ThemeButton.CLEAR} onClick={onToggle}>
        {t('Toggle')}
      </Button>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={styles.lang} />
      </div>
    </div>
  )
}
