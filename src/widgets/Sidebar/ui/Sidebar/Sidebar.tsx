import React, { memo, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import {
  Button,
  ButtonSize,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { SidebarItemList } from '../../model/items'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(
  ({ className }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const onToggle = () => {
      setIsCollapsed((prev) => !prev)
    }

    const itemsList = useMemo(() => {
      return SidebarItemList.map((item) => (
        <SidebarItem
          item={item}
          isCollapsed={isCollapsed}
          key={item.path}
        />
      ))
    }, [isCollapsed])

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
          type='button'
        >
          {isCollapsed ? '>' : '<'}
        </Button>
        <div className={styles.items}>{itemsList}</div>
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
)

Sidebar.displayName = 'Sidebar'
