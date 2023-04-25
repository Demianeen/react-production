import { useTranslation } from 'react-i18next'
import {
  AppLink,
  AppLinkTheme,
} from 'shared/ui/AppLink/AppLink'
import { memo } from 'react'
import { classNames } from 'shared/libs'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import type { SidebarItemType } from '../../model/types/sidebar'
import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo(
  ({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation()

    const isAuth = useSelector(getUserAuthData)

    if (item.authOnly && !isAuth) {
      return null
    }

    return (
      <AppLink
        theme={AppLinkTheme.SECONDARY}
        to={item.path}
        className={classNames(cls.item, {
          [cls.collapsed]: collapsed,
        })}
      >
        <item.Icon className={cls.icon} />
        <span className={cls.link}>{t(item.text)}</span>
      </AppLink>
    )
  }
)
