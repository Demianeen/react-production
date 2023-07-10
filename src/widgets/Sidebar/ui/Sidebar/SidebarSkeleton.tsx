import { ToggleFeature } from '@/shared/lib/features'
import { SidebarDeprecatedSkeleton } from './SidebarDeprecated/SidebarDeprecatedSkeleton'
import { SidebarRedesignedSkeleton } from './SidebarRedesigned/SidebarRedesignedSkeleton'

export interface SidebarSkeletonProps {
  className?: string
}

export const SidebarSkeleton = ({
  className,
}: SidebarSkeletonProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<SidebarRedesignedSkeleton className={className} />}
      off={<SidebarDeprecatedSkeleton className={className} />}
    />
  )
}
