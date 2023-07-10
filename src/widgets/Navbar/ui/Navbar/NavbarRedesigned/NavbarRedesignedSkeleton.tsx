import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import styles from './NavbarRedesigned.module.scss'

interface NavbarRedesignedSkeletonProps {
  className?: string
}

export const NavbarRedesignedSkeleton = memo(
  ({ className }: NavbarRedesignedSkeletonProps) => {
    return (
      <HStack
        as='header'
        aria-busy
        gap={1}
        className={classNames(styles.navbarRedesigned, {}, [
          className,
        ])}
        maxWidth
      >
        <Skeleton variant='circular' size='2rem' />
        <Skeleton variant='circular' size='3rem' />
      </HStack>
    )
  }
)

NavbarRedesignedSkeleton.displayName = 'Navbar'
