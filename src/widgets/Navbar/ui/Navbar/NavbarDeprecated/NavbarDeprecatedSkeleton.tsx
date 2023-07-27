import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'
import { MobileViewport } from '@/shared/lib/components/Media'
import styles from './NavbarDeprecated.module.scss'

interface NavbarDeprecatedSkeletonProps {
  className?: string
}

export const NavbarDeprecatedSkeleton = memo(
  ({ className }: NavbarDeprecatedSkeletonProps) => {
    return (
      <HStack
        as='header'
        gap={1}
        className={classNames(styles.navbarDeprecated, {}, [
          className,
        ])}
        maxWidth
      >
        <MobileViewport>
          <Skeleton width='2rem' height='2rem' borderRadius='50%' />
        </MobileViewport>
        <Skeleton height='var(--font-size-l)' width='7rem' />
        <HStack gap={1} className={styles.actions}>
          <Skeleton width='2rem' height='2rem' borderRadius='50%' />
          <Skeleton width='2rem' height='2rem' borderRadius='50%' />
        </HStack>
      </HStack>
    )
  }
)

NavbarDeprecatedSkeleton.displayName = 'Navbar'
