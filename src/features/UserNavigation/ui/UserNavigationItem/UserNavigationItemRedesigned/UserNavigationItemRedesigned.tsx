import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { useUserAuthData } from '@/entities/User'
import { useTranslation } from 'react-i18next'
import {
  HStack,
  getHStackClassName,
} from '@/shared/ui/redesigned/Stack'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { TooltipButton } from '@/shared/ui/redesigned/TooltipButton'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import styles from './UserNavigationItemRedesigned.module.scss'
import type { SidebarItemArgs } from '../../../model/types/userNavigation'

export interface UserNavigationItemRedesignedProps {
  className?: string
  item: SidebarItemArgs
  isCollapsed: boolean
  onClick?: () => void
}

// TODO: write a linter that won't allow to use deprecated components in the redesigned

export const UserNavigationItemRedesigned = typedMemo(
  ({
    className,
    item,
    isCollapsed,
    onClick,
  }: UserNavigationItemRedesignedProps) => {
    const { t } = useTranslation()
    const isAuth = useUserAuthData()

    if (item.authOnly && !isAuth) {
      return null
    }

    return (
      <HStack as='li' maxWidth>
        <TooltipButton
          as={AppLink}
          to={item.path}
          activeClassName={styles.active}
          tooltipPosition='right'
          tooltipText={t(item.text)}
          variant='clear'
          className={classNamesNew(
            getHStackClassName({
              justify: isCollapsed ? 'center' : undefined,
              maxWidth: true,
            }),
            styles.sidebarItem,
            {
              [styles.collapsed]: isCollapsed,
            },
            className
          )}
          noBorderRadius
          disableTooltip={!isCollapsed}
          onClick={onClick}
        >
          <Icon
            className={styles.icon}
            Svg={item.Icon}
            clickable={isCollapsed as true}
            noWrapWithButton
          />
          <span className={styles.text}>{t(item.text)}</span>
        </TooltipButton>
      </HStack>
    )
  }
)
