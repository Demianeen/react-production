import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink'
import { Icon } from '@/shared/ui/deprecated/Icon'
import {
  TextSize,
  TextTheme,
  Text,
} from '@/shared/ui/deprecated/Text'
import { useUserAuthData } from '@/entities/User'
import { useTranslation } from 'react-i18next'
import styles from './UserNavigationItemDeprecated.module.scss'
import type { SidebarItemArgs } from '../../../model/types/userNavigation'

export interface UserNavigationItemDeprecatedProps {
  className?: string
  item: SidebarItemArgs
  isCollapsed: boolean
  onClick?: () => void
}

export const UserNavigationItemDeprecated = typedMemo(
  ({
    className,
    item,
    isCollapsed,
    onClick,
  }: UserNavigationItemDeprecatedProps) => {
    const { t } = useTranslation()
    const isAuth = useUserAuthData()

    const mods: Mods = {
      [styles.collapsed]: isCollapsed,
    }

    if (item.authOnly && !isAuth) {
      return null
    }

    return (
      <li className={styles.li}>
        <HStack
          as={AppLink}
          theme={AppLinkTheme.INVERTED}
          to={item.path}
          className={classNames('', mods, [className])}
          gap={isCollapsed ? undefined : 1.25}
          onClick={onClick}
        >
          <Icon
            Svg={item.Icon}
            className={styles.icon}
            height={18}
            width={18}
          />
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
  },
)
