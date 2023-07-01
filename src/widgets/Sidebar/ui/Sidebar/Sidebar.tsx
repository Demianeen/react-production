import { memo } from 'react'
import { ToggleFeature } from '@/shared/lib/features'
import { SidebarRedesigned } from '../SidebarRedesigned/SidebarRedesigned'
import { SidebarDeprecated } from '../SidebarDeprecated/SidebarDeprecated'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<SidebarRedesigned className={className} />}
      off={<SidebarDeprecated className={className} />}
    />
  )
})

Sidebar.displayName = 'Sidebar'
