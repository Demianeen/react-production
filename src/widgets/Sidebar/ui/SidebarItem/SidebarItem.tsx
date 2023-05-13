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
import { HStack } from 'shared/ui/Stack'
import { Icon } from 'shared/ui/Icon/Icon'
import {
  Text,
  TextSize,
  TextTheme,
} from 'shared/ui/Text/Text'
import type { SidebarItemArgs } from '../../model/types/sidebar'
import styles from './SidebarItem.module.scss'

interface SidebarItemProps {
  item: SidebarItemArgs
  isCollapsed: boolean
  className?: string
}

export const SidebarItem = memo(
  ({ item, isCollapsed, className }: SidebarItemProps) => {
    const { t } = useTranslation()
    const isAuth = useSelector(getUserAuthData)

    const mods: Mods = {
      [styles.collapsed]: isCollapsed,
    }

    if (item.authOnly && !isAuth) {
      return null
    }

    return (
      <li>
        <HStack
          as={AppLink}
          theme={AppLinkTheme.INVERTED}
          to={item.path}
          className={classNames('', mods, [className])}
          gap={1.25}
        >
          <Icon Svg={item.Icon} className={styles.icon} />
          <Text
            TitleTag='span'
            title={t(item.text)}
            className={styles.text}
            size={TextSize.S}
            theme={TextTheme.INVERTED}
          />
        </HStack>
      </li>
    )
  }
)

SidebarItem.displayName = 'SidebarItem'
