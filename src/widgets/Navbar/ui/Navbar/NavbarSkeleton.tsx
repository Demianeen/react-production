import { ToggleFeature } from '@/shared/lib/features'
import { NavbarRedesignedSkeleton } from './NavbarRedesigned/NavbarRedesignedSkeleton'
import { NavbarDeprecatedSkeleton } from './NavbarDeprecated/NavbarDeprecatedSkeleton'

export interface NavbarSkeletonProps {
  className?: string
}

export const NavbarSkeleton = ({
  className,
}: NavbarSkeletonProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<NavbarRedesignedSkeleton className={className} />}
      off={<NavbarDeprecatedSkeleton className={className} />}
    />
  )
}
