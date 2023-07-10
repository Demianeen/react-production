import { useMemo } from 'react'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { AppLogo } from '@/shared/ui/redesigned/AppLogo'
import { LangSwitcher } from '@/features/LangSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { Card } from '@/shared/ui/redesigned/Card'
import styles from './SidebarRedesigned.module.scss'

interface SidebarRedesignedSkeletonProps {
  className?: string
}

export const SidebarRedesignedSkeleton = typedMemo(
  ({ className }: SidebarRedesignedSkeletonProps) => {
    const itemsList = useMemo(() => {
      return Array(4)
        .fill(null)
        .map((_, index) => (
          <Skeleton
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            variant='text'
          />
        ))
    }, [])

    return (
      <Card
        background='light'
        className={classNamesNew(styles.sidebarRedesigned, className)}
        padding={0}
      >
        <AppLogo size='3.5rem' className={styles.logo} />
        <nav>
          <VStack
            gap={1.25}
            className={classNamesNew(
              styles.items,
              styles.skeletonNav
            )}
            as='ul'
          >
            {itemsList}
          </VStack>
        </nav>

        <HStack
          justify='center'
          gap={1}
          maxWidth
          className={styles.switchers}
        >
          <ThemeSwitcher />
          <LangSwitcher />
        </HStack>
      </Card>
    )
  }
)
