import { VStack } from '@/shared/ui/redesigned/Stack'
import { memo, useCallback, useMemo } from 'react'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { toggleFeature } from '@/shared/lib/features'
import type { SidebarItemArgs } from '../../model/types/userNavigation'
import { useUserNavigationItems } from '../../model/selectors/getUserNavigationItems/getUserNavigationItems'
import styles from './UserNavigation.module.scss'
import { UserNavigationItem } from '../UserNavigationItem/UserNavigationItem'

export type OnUserNavigationItemClick = (
  item: SidebarItemArgs
) => void

interface UserNavigationProps {
  className?: string
  isCollapsed?: boolean
  onItemClick?: OnUserNavigationItemClick
}

export const UserNavigation = memo(
  ({
    className,
    isCollapsed = false,
    onItemClick: onClick,
  }: UserNavigationProps) => {
    const items = useUserNavigationItems()

    const handleClick = useCallback(
      (userNavigationItem: SidebarItemArgs) => {
        return () => onClick?.(userNavigationItem)
      },
      [onClick]
    )

    const itemsList = useMemo(() => {
      return items.map((item) => (
        <UserNavigationItem
          item={item}
          isCollapsed={isCollapsed}
          key={item.path}
          onClick={handleClick(item)}
        />
      ))
    }, [handleClick, isCollapsed, items])

    return (
      <nav>
        <VStack
          gap={1}
          className={classNamesNew(
            toggleFeature({
              name: 'isAppRedesigned',
              on: () => styles.redesignedItems,
              off: () => styles.deprecatedItems,
            }),
            className
          )}
          as='ul'
        >
          {itemsList}
        </VStack>
      </nav>
    )
  }
)

UserNavigation.displayName = 'UserNavigation'
