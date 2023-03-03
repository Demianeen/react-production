import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
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
      <button type='button' onClick={onToggle}>
        Toggle
      </button>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={styles.lang} />
      </div>
    </div>
  )
}
