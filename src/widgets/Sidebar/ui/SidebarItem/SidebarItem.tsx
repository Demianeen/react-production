import React, { memo } from 'react'
import {
  AppLink,
  AppLinkTheme,
} from 'shared/ui/AppLink/AppLink'
import type { Mods } from 'shared/lib/classNames/classNames'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import type { SidebarItemArgs } from '../../model/items'
import styles from './SidebarItem.module.scss'

interface SidebarItemProps {
  item: SidebarItemArgs
  isCollapsed: boolean
}

export const SidebarItem = memo(
  ({ item, isCollapsed }: SidebarItemProps) => {
    const { t } = useTranslation()
    const isAuth = useSelector(getUserAuthData)

    const mods: Mods = {
      [styles.collapsed]: isCollapsed,
    }

    if (item.authOnly && !isAuth) {
      return null
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
