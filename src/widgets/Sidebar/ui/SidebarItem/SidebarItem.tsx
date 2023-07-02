import { memo } from 'react'
import { ToggleFeature } from '@/shared/lib/features'
import { SidebarItemRedesigned } from './SidebarItemRedesigned/SidebarItemRedesigned'
import { SidebarItemDeprecated } from './SidebarItemDeprecated/SidebarItemDeprecated'
import type { SidebarItemArgs } from '../../model/types/sidebar'

interface SidebarItemProps {
  item: SidebarItemArgs
  isCollapsed: boolean
  className?: string
}

export const SidebarItem = memo(
  ({ item, isCollapsed, className }: SidebarItemProps) => {
    return (
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <SidebarItemRedesigned
            isCollapsed={isCollapsed}
            item={item}
            className={className}
          />
        }
        off={
          <SidebarItemDeprecated
            isCollapsed={isCollapsed}
            item={item}
            className={className}
          />
        }
      />
    )
  }
)

SidebarItem.displayName = 'SidebarItem'
