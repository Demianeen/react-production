import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { HStack } from '@/shared/ui/Stack'
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink'
import { Icon } from '@/shared/ui/deprecated/Icon'
import {
  TextSize,
  TextTheme,
  Text,
} from '@/shared/ui/deprecated/Text'
import { getUserAuthData } from '@/entities/User'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import styles from './SidebarItemDeprecated.module.scss'
import type { SidebarItemArgs } from '../../../model/types/sidebar'

export interface SidebarItemDeprecatedProps {
  className?: string
  item: SidebarItemArgs
  isCollapsed: boolean
}

export const SidebarItemDeprecated = typedMemo(
  ({ className, item, isCollapsed }: SidebarItemDeprecatedProps) => {
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
