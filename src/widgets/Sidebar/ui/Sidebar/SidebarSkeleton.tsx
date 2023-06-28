import { useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Skeleton } from '@/shared/ui/Skeleton'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import styles from './Sidebar.module.scss'

interface SidebarSkeletonProps {
  className?: string
}

export const SidebarSkeleton = typedMemo(
  ({ className }: SidebarSkeletonProps) => {
    const itemsList = useMemo(() => {
      return Array(4)
        .fill(null)
        .map((_, index) => (
          <Skeleton
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            height='var(--font-size-m)'
          />
        ))
    }, [])

    return (
      <VStack
        className={classNames(styles.sidebar, {}, [className])}
        data-testid='sidebar'
        justify='between'
        as='section'
      >
        <VStack gap={2} className={styles.items} as='ul' maxWidth>
          {itemsList}
        </VStack>
      </VStack>
    )
  }
)
