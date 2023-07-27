import { memo } from 'react'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { useViewport } from '@/shared/lib/hooks/useViewport/useViewport'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { UserDropdownAvatarSize } from '@/features/UserDropdown'
import styles from './NavbarRedesigned.module.scss'

interface NavbarRedesignedSkeletonProps {
  className?: string
}

export const NavbarRedesignedSkeleton = memo(
  ({ className }: NavbarRedesignedSkeletonProps) => {
    const { isMobile } = useViewport()

    return (
      <HStack
        as='header'
        justify='between'
        aria-busy
        className={classNamesNew(
          styles.navbarRedesigned,
          {
            [styles.mobile]: isMobile,
          },
          className
        )}
        maxWidth
      >
        <Skeleton
          backgroundColor='normal'
          variant='circular'
          size='2.4rem'
        />

        <HStack gap={1}>
          <Skeleton
            backgroundColor='normal'
            variant='circular'
            size='2rem'
          />
          <Skeleton
            variant='circular'
            size={UserDropdownAvatarSize(isMobile)}
            backgroundColor='normal'
          />
        </HStack>
      </HStack>
    )
  }
)

NavbarRedesignedSkeleton.displayName = 'Navbar'
