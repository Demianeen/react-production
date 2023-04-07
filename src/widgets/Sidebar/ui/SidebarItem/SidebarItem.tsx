import React, { memo } from 'react'
import {
  AppLink,
  AppLinkTheme,
} from 'shared/ui/AppLink/AppLink'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import type { SidebarItemArgs } from '../../model/items'
import styles from './SidebarItem.module.scss'

interface SidebarItemProps {
  item: SidebarItemArgs
  isCollapsed: boolean
}

export const SidebarItem = memo(
  ({ item, isCollapsed }: SidebarItemProps) => {
    const { t } = useTranslation()
    const mods = {
      [styles.collapsed]: isCollapsed,
    }

    return (
      <AppLink
        theme={AppLinkTheme.INVERTED}
        to={item.path}
        className={classNames(styles.item, mods)}
      >
        <item.Icon className={styles.icon} />
        <span className={styles.text}>{t(item.text)}</span>
      </AppLink>
    )
  }
)

SidebarItem.displayName = 'SidebarItem'
