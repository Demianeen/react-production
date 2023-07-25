import { memo } from 'react'
import { ToggleFeature } from '@/shared/lib/features'
import { UserNavigationItemRedesigned } from './UserNavigationItemRedesigned/UserNavigationItemRedesigned'
import { UserNavigationItemDeprecated } from './UserNavigationItemDeprecated/UserNavigationItemDeprecated'
import type { SidebarItemArgs } from '../../model/types/userNavigation'

interface UserNavigationItemProps {
  item: SidebarItemArgs
  isCollapsed: boolean
  className?: string
}

export const UserNavigationItem = memo(
  ({ item, isCollapsed, className }: UserNavigationItemProps) => {
    return (
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <UserNavigationItemRedesigned
            isCollapsed={isCollapsed}
            item={item}
            className={className}
          />
        }
        off={
          <UserNavigationItemDeprecated
            isCollapsed={isCollapsed}
            item={item}
            className={className}
          />
        }
      />
    )
  }
)

UserNavigationItem.displayName = 'SidebarItem'
