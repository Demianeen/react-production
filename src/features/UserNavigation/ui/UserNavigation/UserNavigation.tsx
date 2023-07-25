import { VStack } from '@/shared/ui/redesigned/Stack'
import { memo, useMemo } from 'react'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { toggleFeature } from '@/shared/lib/features'
import { useUserNavigationItems } from '../../model/selectors/getUserNavigationItems/getUserNavigationItems'
import styles from './UserNavigation.module.scss'
import { UserNavigationItem } from '../UserNavigationItem/UserNavigationItem'

interface UserNavigationProps {
  className?: string
  isCollapsed?: boolean
}

export const UserNavigation = memo(
  ({ className, isCollapsed = false }: UserNavigationProps) => {
    const items = useUserNavigationItems()

    const itemsList = useMemo(() => {
      return items.map((item) => (
        <UserNavigationItem
          item={item}
          isCollapsed={isCollapsed}
          key={item.path}
        />
      ))
    }, [isCollapsed, items])

    return (
      <nav>
        <VStack
          gap={1}
          className={classNamesNew(
            toggleFeature({
              name: 'isAppRedesigned',
              on: () => styles.redesignedItems,
              off: () => styles.deprecatedItems,
            }),
            className
          )}
          as='ul'
        >
          {itemsList}
        </VStack>
      </nav>
    )
  }
)

UserNavigation.displayName = 'UserNavigation'
