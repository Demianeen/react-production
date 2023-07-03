import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { getUserAuthData } from '@/entities/User'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { Icon } from '@/shared/ui/redesigned/Icon'
import styles from './SidebarItemRedesigned.module.scss'
import type { SidebarItemArgs } from '../../../model/types/sidebar'

export interface SidebarItemRedesignedProps {
  className?: string
  item: SidebarItemArgs
  isCollapsed: boolean
}

// TODO: write a linter that won't allow to use deprecated components in the redesigned

export const SidebarItemRedesigned = typedMemo(
  ({ className, item, isCollapsed }: SidebarItemRedesignedProps) => {
    const { t } = useTranslation()
    const isAuth = useSelector(getUserAuthData)

    if (item.authOnly && !isAuth) {
      return null
    }

    return (
      <HStack as='li' maxWidth>
        <HStack
          as={AppLink}
          to={item.path}
          className={classNames(
            styles.sidebarItem,
            {
              [styles.collapsed]: isCollapsed,
            },
            [className]
          )}
          activeClassName={styles.active}
          justify={isCollapsed ? 'center' : undefined}
          maxWidth
        >
          <Icon className={styles.icon} Svg={item.Icon} />
          <span className={styles.text}>{t(item.text)}</span>
        </HStack>
      </HStack>
    )
  }
)
